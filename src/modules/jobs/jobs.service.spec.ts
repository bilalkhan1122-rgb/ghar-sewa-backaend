import { Test, TestingModule } from "@nestjs/testing";
import { Logger } from "nestjs-pino";
import { PrismaService } from "src/prisma/prisma.service";
import { FileUploadService } from "src/common/services/file-upload.service";
import { AdminAuditService } from "src/common/services/admin-audit.service";
import { NotificationsService } from "../notifications/notifications.service";
import { PenaltiesService } from "../penalties/penalties.service";
import { RealtimeService } from "../realtime/realtime.service";
import { WalletService } from "../wallet/wallet.service";
import { JobsService } from "./jobs.service";
import { NotificationType } from "generated/prisma/client";

const decimal = (n: number) => ({ toNumber: () => n });

const HOUR_MS = 60 * 60 * 1000;

describe("JobsService (Module 20 — urgent jobs)", () => {
  let service: JobsService;

  const prisma = {
    serviceCategory: { findUnique: jest.fn() },
    job: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      delete: jest.fn(),
    },
    providerServiceCategory: { findMany: jest.fn() },
    user: { findUnique: jest.fn() },
    jobImage: { create: jest.fn() },
  };

  /** Prisma returns Decimal-like values for money columns. */
  const mockCreateJob = (overrides: Record<string, unknown> = {}) =>
    jest.fn(({ data }: { data: Record<string, unknown> }) =>
      Promise.resolve(
        createdJob({
          ...data,
          offeredPrice: decimal(data.offeredPrice as number),
          ...overrides,
        }),
      ),
    );
  const fileUpload = { deleteFile: jest.fn(), uploadGalleryImage: jest.fn() };
  const notifications = { send: jest.fn(), sendToMany: jest.fn() };
  const penalties = { assertProviderEligible: jest.fn() };
  const adminAudit = { record: jest.fn() };
  const realtime = {
    publishUrgentJobCreated: jest.fn().mockResolvedValue(true),
    publishUrgentJobExpired: jest.fn().mockResolvedValue(true),
  };
  const logger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };
  // Resolves by default: the affordability rule has its own coverage, and every
  // other test here would otherwise have to fund a wallet first.
  const wallet = { assertCanStartJob: jest.fn().mockResolvedValue(undefined) };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        { provide: PrismaService, useValue: prisma },
        { provide: FileUploadService, useValue: fileUpload },
        { provide: Logger, useValue: logger },
        { provide: NotificationsService, useValue: notifications },
        { provide: PenaltiesService, useValue: penalties },
        { provide: AdminAuditService, useValue: adminAudit },
        { provide: RealtimeService, useValue: realtime },
        { provide: WalletService, useValue: wallet },
      ],
    }).compile();
    service = module.get<JobsService>(JobsService);
  });

  const createdJob = (overrides: Record<string, unknown> = {}) => ({
    id: "job1",
    customerId: "c1",
    categoryId: "cat1",
    title: "Fix leaking tap",
    offeredPrice: decimal(1500),
    isUrgent: false,
    expiresAt: new Date(),
    category: { id: "cat1" },
    images: [],
    ...overrides,
  });

  describe("createJob — server-side expiry", () => {
    it("normal jobs expire after ~24 hours", async () => {
      prisma.serviceCategory.findUnique.mockResolvedValue({
        id: "cat1",
        isActive: true,
      });
      prisma.job.create.mockImplementation(mockCreateJob());
      prisma.providerServiceCategory.findMany.mockResolvedValue([]);

      const before = Date.now();
      const job = await service.createJob("c1", {
        categoryId: "cat1",
        title: "Fix leaking tap",
        description: "Kitchen tap",
        offeredPrice: 1500,
        address: "Kathmandu",
        latitude: 27.7,
        longitude: 85.3,
      });

      const expiry = job.expiresAt.getTime();
      expect(expiry).toBeGreaterThan(before + 23.9 * HOUR_MS);
      // small tolerance for the wall-clock between `before` and the create call
      expect(expiry).toBeLessThanOrEqual(before + 24 * HOUR_MS + 2000);
      expect(job.isUrgent).toBe(false);
      expect(notifications.sendToMany).toHaveBeenCalled();
    });

    it("urgent jobs expire after ~6 hours", async () => {
      prisma.serviceCategory.findUnique.mockResolvedValue({
        id: "cat1",
        isActive: true,
      });
      prisma.job.create.mockImplementation(mockCreateJob());
      prisma.providerServiceCategory.findMany.mockResolvedValue([]);

      const before = Date.now();
      const job = await service.createJob("c1", {
        categoryId: "cat1",
        title: "Burst pipe!",
        description: "Emergency",
        offeredPrice: 3000,
        address: "Kathmandu",
        latitude: 27.7,
        longitude: 85.3,
        isUrgent: true,
      });

      const expiry = job.expiresAt.getTime();
      expect(expiry).toBeGreaterThan(before + 5.9 * HOUR_MS);
      expect(expiry).toBeLessThanOrEqual(before + 6 * HOUR_MS + 2000);
      expect(job.isUrgent).toBe(true);
    });

    it("the client cannot influence expiry (no client-supplied expiresAt)", async () => {
      prisma.serviceCategory.findUnique.mockResolvedValue({
        id: "cat1",
        isActive: true,
      });
      let captured: Record<string, unknown> | null = null;
      prisma.job.create.mockImplementation(({ data }) => {
        captured = data;
        return Promise.resolve(
          createdJob({
            ...data,
            offeredPrice: decimal(data.offeredPrice as number),
          }),
        );
      });
      prisma.providerServiceCategory.findMany.mockResolvedValue([]);

      const before = Date.now();
      await service.createJob("c1", {
        categoryId: "cat1",
        title: "Fix tap",
        description: "x",
        offeredPrice: 1000,
        address: "KTM",
        latitude: 27.7,
        longitude: 85.3,
        isUrgent: true,
      });

      // The expiry always derives from the isUrgent flag server-side.
      const capturedData: Record<string, unknown> = captured ?? {};
      expect(capturedData).not.toHaveProperty("clientExpiresAt");
      const expiry = (capturedData.expiresAt as Date).getTime();
      expect(expiry).toBeGreaterThan(before + 5.9 * HOUR_MS);
      expect(expiry).toBeLessThanOrEqual(before + 6 * HOUR_MS + 2000);
    });

    it("rejects jobs in inactive categories", async () => {
      prisma.serviceCategory.findUnique.mockResolvedValue({
        id: "cat1",
        isActive: false,
      });
      await expect(
        service.createJob("c1", {
          categoryId: "cat1",
          title: "x",
          description: "x",
          offeredPrice: 100,
          address: "KTM",
          latitude: 27.7,
          longitude: 85.3,
        }),
      ).rejects.toThrow("Invalid or inactive category");
    });
  });

  describe("createJob — urgent notification + realtime", () => {
    it("sends URGENT_JOB_POSTED notifications and job.urgent.created events to matching providers", async () => {
      prisma.serviceCategory.findUnique.mockResolvedValue({
        id: "cat1",
        isActive: true,
      });
      prisma.job.create.mockImplementation(
        mockCreateJob({
          isUrgent: true,
          expiresAt: new Date(Date.now() + 6 * HOUR_MS),
        }),
      );
      prisma.providerServiceCategory.findMany.mockResolvedValue([
        { provider: { userId: "p1" } },
        { provider: { userId: "p2" } },
      ]);

      await service.createJob("c1", {
        categoryId: "cat1",
        title: "Emergency!",
        description: "x",
        offeredPrice: 5000,
        address: "KTM",
        latitude: 27.7,
        longitude: 85.3,
        isUrgent: true,
      });
      // notifyMatchingProviders runs fire-and-forget — flush microtasks
      await new Promise((r) => setTimeout(r, 10));

      expect(notifications.sendToMany).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ type: NotificationType.URGENT_JOB_POSTED }),
        ]),
      );
      expect(realtime.publishUrgentJobCreated).toHaveBeenCalledTimes(2);
      expect(realtime.publishUrgentJobCreated).toHaveBeenCalledWith(
        "p1",
        expect.objectContaining({
          jobId: "job1",
          isUrgent: true,
          title: "Emergency!",
        }),
      );
      expect(realtime.publishUrgentJobCreated).toHaveBeenCalledWith(
        "p2",
        expect.objectContaining({ jobId: "job1" }),
      );
    });

    it("does not publish job.urgent.created for normal jobs", async () => {
      prisma.serviceCategory.findUnique.mockResolvedValue({
        id: "cat1",
        isActive: true,
      });
      prisma.job.create.mockImplementation(({ data }) =>
        Promise.resolve(createdJob({ ...data })),
      );
      prisma.providerServiceCategory.findMany.mockResolvedValue([
        { provider: { userId: "p1" } },
      ]);

      await service.createJob("c1", {
        categoryId: "cat1",
        title: "Normal job",
        description: "x",
        offeredPrice: 1000,
        address: "KTM",
        latitude: 27.7,
        longitude: 85.3,
      });
      await new Promise((r) => setTimeout(r, 10));

      expect(realtime.publishUrgentJobCreated).not.toHaveBeenCalled();
      expect(notifications.sendToMany).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ type: NotificationType.NEW_JOB }),
        ]),
      );
    });
  });

  describe("getProviderJobFeed", () => {
    const approvedProvider = {
      id: "p1",
      role: "PROVIDER",
      verificationStatus: "APPROVED",
      profileCompleted: true,
      isActive: true,
      providerProfile: { categories: [{ categoryId: "cat1" }] },
    };

    beforeEach(() => {
      penalties.assertProviderEligible.mockResolvedValue(undefined);
      prisma.user.findUnique.mockResolvedValue(approvedProvider);
      prisma.job.findMany.mockResolvedValue([]);
      prisma.job.count.mockResolvedValue(0);
    });

    it("orders urgent jobs first and excludes expired ones", async () => {
      await service.getProviderJobFeed("p1", { page: 1, limit: 10 });

      expect(prisma.job.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: [{ isUrgent: "desc" }, { createdAt: "desc" }],
          where: expect.objectContaining({
            status: "PENDING",
            expiresAt: { gt: expect.any(Date) },
            categoryId: { in: ["cat1"] },
          }),
        }),
      );
    });

    it("blocks providers that are not fully approved", async () => {
      prisma.user.findUnique.mockResolvedValue({
        ...approvedProvider,
        verificationStatus: "PENDING",
      });

      await expect(
        service.getProviderJobFeed("p1", { page: 1, limit: 10 }),
      ).rejects.toThrow("approved and complete");
    });

    it("returns an empty feed for providers without categories", async () => {
      prisma.user.findUnique.mockResolvedValue({
        ...approvedProvider,
        providerProfile: { categories: [] },
      });

      const result = await service.getProviderJobFeed("p1", {
        page: 1,
        limit: 10,
      });
      expect(result.data).toEqual([]);
      expect(prisma.job.findMany).not.toHaveBeenCalled();
    });
  });

  describe("getJobForProvider", () => {
    it("hides expired jobs even when status is still PENDING", async () => {
      penalties.assertProviderEligible.mockResolvedValue(undefined);
      prisma.job.findUnique.mockResolvedValue({
        id: "job1",
        categoryId: "cat1",
        status: "PENDING",
        expiresAt: new Date(Date.now() - 1000),
        customer: { id: "c1" },
        category: {},
        images: [],
      });
      prisma.user.findUnique.mockResolvedValue({
        id: "p1",
        role: "PROVIDER",
        verificationStatus: "APPROVED",
        profileCompleted: true,
        isActive: true,
        providerProfile: { categories: [{ categoryId: "cat1" }] },
      });

      await expect(service.getJobForProvider("p1", "job1")).rejects.toThrow(
        "Job has expired",
      );
    });

    it("hides jobs outside the provider's categories", async () => {
      penalties.assertProviderEligible.mockResolvedValue(undefined);
      prisma.job.findUnique.mockResolvedValue({
        id: "job1",
        categoryId: "cat9",
        status: "PENDING",
        expiresAt: new Date(Date.now() + 1000),
        customer: { id: "c1" },
        category: {},
        images: [],
      });
      prisma.user.findUnique.mockResolvedValue({
        id: "p1",
        role: "PROVIDER",
        verificationStatus: "APPROVED",
        profileCompleted: true,
        isActive: true,
        providerProfile: { categories: [{ categoryId: "cat1" }] },
      });

      await expect(service.getJobForProvider("p1", "job1")).rejects.toThrow(
        "not in your service categories",
      );
    });
  });

  describe("expireOverdueJobs", () => {
    it("publishes job.urgent.expired only for urgent expired jobs", async () => {
      prisma.job.updateMany.mockResolvedValue({ count: 2 });
      prisma.job.findMany.mockResolvedValue([
        { id: "j1", title: "Urgent A", customerId: "c1", isUrgent: true },
        { id: "j2", title: "Normal B", customerId: "c2", isUrgent: false },
      ]);

      await service.expireOverdueJobs();
      await new Promise((r) => setTimeout(r, 10));

      expect(realtime.publishUrgentJobExpired).toHaveBeenCalledTimes(1);
      expect(realtime.publishUrgentJobExpired).toHaveBeenCalledWith(
        "c1",
        expect.objectContaining({ jobId: "j1", isUrgent: true }),
      );
      expect(notifications.sendToMany).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            userId: "c2",
            type: NotificationType.JOB_EXPIRED,
          }),
        ]),
      );
    });
  });
});
