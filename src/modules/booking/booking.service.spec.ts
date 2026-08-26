import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import { Logger } from "nestjs-pino";
import { PrismaService } from "src/prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { PenaltiesService } from "../penalties/penalties.service";
import { WalletService } from "../wallet/wallet.service";
import { RankingService } from "../ranking/ranking.service";
import { RealtimeService } from "../realtime/realtime.service";
import { SubcategoriesService } from "../categories/subcategories.service";
import { BookingService } from "./booking.service";
import {
  UserRole,
  UserStatus,
  VerificationStatus,
} from "generated/prisma/client";

/**
 * Direct booking is the second way a job gets created, and it drifted from
 * `POST /jobs`: it took no sub-type at all, so booking a provider directly
 * silently recorded less about the work than posting it openly did.
 */
describe("BookingService — direct booking sub-types", () => {
  let service: BookingService;

  const prisma = {
    user: { findUnique: jest.fn() },
    serviceCategory: { findUnique: jest.fn() },
    $transaction: jest.fn(),
  };

  const tx = {
    job: { create: jest.fn() },
    booking: { create: jest.fn() },
    jobTimeline: { create: jest.fn() },
  };

  const logger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };
  const notifications = { send: jest.fn(), sendToMany: jest.fn() };
  const penalties = { assertProviderEligible: jest.fn() };
  const wallet = { assertCanStartJob: jest.fn() };
  const ranking = { recalculateForProvider: jest.fn() };
  const realtime = { publish: jest.fn(), emitToUser: jest.fn() };
  const subcategories = { assertBelongsToCategory: jest.fn() };

  const PROVIDER = {
    id: "prov1",
    role: UserRole.PROVIDER,
    roles: [UserRole.PROVIDER],
    verificationStatus: VerificationStatus.APPROVED,
    status: UserStatus.ACTIVE,
    profileCompleted: true,
    isActive: true,
    providerProfile: { categories: [{ categoryId: "cat1" }] },
  };

  const dto = (overrides: Record<string, unknown> = {}) => ({
    providerId: "prov1",
    categoryId: "cat1",
    title: "Fix the AC",
    description: "The air conditioner stopped cooling two days ago.",
    address: "House 12, Gulberg, Lahore",
    latitude: 31.5204,
    longitude: 74.3587,
    totalAmount: 3000,
    ...overrides,
  });

  beforeEach(async () => {
    jest.clearAllMocks();

    prisma.user.findUnique.mockResolvedValue(PROVIDER);
    prisma.serviceCategory.findUnique.mockResolvedValue({
      id: "cat1",
      isActive: true,
    });
    subcategories.assertBelongsToCategory.mockResolvedValue(undefined);
    wallet.assertCanStartJob.mockResolvedValue(undefined);

    tx.job.create.mockImplementation(({ data }: { data: object }) =>
      Promise.resolve({ id: "job1", ...data }),
    );
    tx.booking.create.mockResolvedValue({ id: "book1" });
    tx.jobTimeline.create.mockResolvedValue({});
    prisma.$transaction.mockImplementation((fn: (t: typeof tx) => unknown) =>
      fn(tx),
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        { provide: PrismaService, useValue: prisma },
        { provide: Logger, useValue: logger },
        { provide: NotificationsService, useValue: notifications },
        { provide: PenaltiesService, useValue: penalties },
        { provide: WalletService, useValue: wallet },
        { provide: RankingService, useValue: ranking },
        { provide: RealtimeService, useValue: realtime },
        { provide: SubcategoriesService, useValue: subcategories },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it("persists the sub-type it was given", async () => {
    await service.createDirectBooking("cust1", dto({ subcategoryId: "sub1" }));

    expect(subcategories.assertBelongsToCategory).toHaveBeenCalledWith(
      "cat1",
      "sub1",
    );
    expect(tx.job.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ subcategoryId: "sub1" }),
      }),
    );
  });

  it("stores null when no sub-type is sent, rather than refusing the booking", async () => {
    await service.createDirectBooking("cust1", dto());

    expect(subcategories.assertBelongsToCategory).not.toHaveBeenCalled();
    expect(tx.job.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ subcategoryId: null }),
      }),
    );
  });

  // A sub-type of another category is real and active, so only the parent
  // check catches it. Without this the booking is filed under a pairing that
  // does not exist.
  it("refuses a sub-type belonging to another category", async () => {
    subcategories.assertBelongsToCategory.mockRejectedValue(
      new BadRequestException(
        "The subcategory does not belong to the selected category",
      ),
    );

    await expect(
      service.createDirectBooking("cust1", dto({ subcategoryId: "other" })),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(tx.job.create).not.toHaveBeenCalled();
  });

  it("checks the sub-type only after the category is known to be valid", async () => {
    prisma.serviceCategory.findUnique.mockResolvedValue(null);

    await expect(
      service.createDirectBooking("cust1", dto({ subcategoryId: "sub1" })),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(subcategories.assertBelongsToCategory).not.toHaveBeenCalled();
  });

  // The app types this response as a full job and read `category` off it.
  it("embeds the category and sub-type on the job it returns", async () => {
    await service.createDirectBooking("cust1", dto({ subcategoryId: "sub1" }));

    expect(tx.job.create).toHaveBeenCalledWith(
      expect.objectContaining({
        include: { category: true, subcategory: true },
      }),
    );
  });
});
