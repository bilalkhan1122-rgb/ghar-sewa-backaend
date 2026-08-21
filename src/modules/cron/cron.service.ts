import { Injectable } from "@nestjs/common";
import { Logger } from "nestjs-pino";
import { PrismaService } from "src/prisma/prisma.service";
import { WalletService } from "../wallet/wallet.service";
import { NotificationsService } from "../notifications/notifications.service";
import { NotificationType } from "generated/prisma/client";

/** Don't nag more than once a day per unpaid booking. */
const REMINDER_INTERVAL_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class CronService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wallet: WalletService,
    private readonly notifications: NotificationsService,
    private readonly logger: Logger,
  ) {}

  /**
   * Chases every customer sitting on an unpaid confirmed job.
   *
   * Tries to settle first: a balance may have arrived since the last run by a
   * route that does not itself settle — a refund, an admin adjustment — and
   * sending someone a payment demand they have already covered is worse than
   * sending nothing.
   */
  async sendPaymentReminders() {
    const due = await this.prisma.booking.findMany({
      where: { paymentDueAt: { not: null } },
      select: {
        id: true,
        customerId: true,
        totalAmount: true,
        paymentDueAt: true,
        paymentRemindedAt: true,
        paymentReminderCount: true,
        job: { select: { title: true } },
      },
      orderBy: { paymentDueAt: "asc" },
    });

    const customerIds = [...new Set(due.map((booking) => booking.customerId))];

    let settledCount = 0;
    for (const customerId of customerIds) {
      try {
        const { count } = await this.wallet.settleDuePayments(customerId);
        settledCount += count;
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
        select: { paymentDueAt: true, paymentRemindedAt: true },
      });
      if (!current?.paymentDueAt) continue;
      if (current.paymentRemindedAt && current.paymentRemindedAt > cutoff) {
        continue;
      }

      const days = Math.max(
        1,
        Math.floor(
          (Date.now() - booking.paymentDueAt!.getTime()) /
            (24 * 60 * 60 * 1000),
        ),
      );

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
