import { Injectable } from "@nestjs/common";
import { Logger } from "nestjs-pino";
import { PrismaService } from "src/prisma/prisma.service";
import { WalletService } from "../wallet/wallet.service";
import { NotificationsService } from "../notifications/notifications.service";
import { JobsService } from "../jobs/jobs.service";
import {
  BookingPaymentStatus,
  NotificationType,
} from "generated/prisma/client";

/** Don't nag more than once a day per unpaid booking. */
const REMINDER_INTERVAL_MS = 24 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class CronService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wallet: WalletService,
    private readonly notifications: NotificationsService,
    private readonly jobs: JobsService,
    private readonly logger: Logger,
  ) {}

  /**
   * Retires jobs nobody answered before their deadline.
   *
   * Urgent jobs are given 6 hours and the rest 24, and the provider feed has
   * always honoured that with a live `expiresAt` filter. Nothing moved the
   * job's own status though, so it stayed PENDING: gone from every provider's
   * feed, still sitting in the customer's Active tab looking like it was out
   * there collecting offers. This is what closes that gap, and expiring a job
   * is what lets its owner repost it.
   */
  async expireJobs() {
    const count = await this.jobs.expireOverdueJobs();
    this.logger.log({ message: "Expiry sweep finished", count });
    return { expired: count };
  }

  /**
   * Chases every customer sitting on a booking both parties confirmed but
   * nobody has paid for.
   *
   * Tries to settle first: a balance may have arrived since the last run by a
   * route that does not itself settle — a refund, an admin adjustment — and
   * sending someone a payment demand they have already covered is worse than
   * sending nothing.
   */
  async sendPaymentReminders() {
    const due = await this.prisma.booking.findMany({
      where: { paymentStatus: BookingPaymentStatus.PAYMENT_PENDING },
      select: {
        id: true,
        customerId: true,
        totalAmount: true,
        customerConfirmedAt: true,
        providerConfirmedAt: true,
        paymentRemindedAt: true,
        job: { select: { title: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    const customerIds = [...new Set(due.map((booking) => booking.customerId))];

    let settledCount = 0;
    for (const customerId of customerIds) {
      try {
        const { settled } = await this.wallet.retryPendingPayments(customerId);
        settledCount += settled.length;
      } catch (err) {
        const error = err as { message?: string };
        this.logger.error(
          { err: error, customerId },
          "Settlement sweep failed for a customer",
        );
      }
    }

    const cutoff = new Date(Date.now() - REMINDER_INTERVAL_MS);
    let remindedCount = 0;

    for (const booking of due) {
      // Re-read: the sweep above may have just paid this one off.
      const current = await this.prisma.booking.findUnique({
        where: { id: booking.id },
        select: { paymentStatus: true, paymentRemindedAt: true },
      });
      if (current?.paymentStatus !== BookingPaymentStatus.PAYMENT_PENDING) {
        continue;
      }
      if (current.paymentRemindedAt && current.paymentRemindedAt > cutoff) {
        continue;
      }

      // The bill fell due when the second party confirmed; there is no
      // separate due-date column in this model.
      const dueSince = [
        booking.customerConfirmedAt,
        booking.providerConfirmedAt,
      ]
        .filter((date): date is Date => date !== null)
        .sort((a, b) => b.getTime() - a.getTime())[0];
      const days = dueSince
        ? Math.max(1, Math.floor((Date.now() - dueSince.getTime()) / DAY_MS))
        : 1;

      await this.notifications.send({
        userId: booking.customerId,
        type: NotificationType.PAYMENT_DUE,
        title: "Payment still due 💳",
        message:
          `Rs. ${booking.totalAmount.toString()} for "${booking.job.title}" has been ` +
          `outstanding for ${days} day${days === 1 ? "" : "s"}. Top up to pay your ` +
          "provider — you cannot post or book again until it is cleared.",
        relatedEntityType: "BOOKING",
        relatedEntityId: booking.id,
      });

      await this.prisma.booking.update({
        where: { id: booking.id },
        data: {
          paymentRemindedAt: new Date(),
          paymentReminderCount: { increment: 1 },
        },
      });
      remindedCount += 1;
    }

    this.logger.log({
      message: "Payment reminder sweep finished",
      due: due.length,
      settled: settledCount,
      reminded: remindedCount,
    });

    return { due: due.length, settled: settledCount, reminded: remindedCount };
  }
}
