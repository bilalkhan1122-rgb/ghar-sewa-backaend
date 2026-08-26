import { Test, TestingModule } from "@nestjs/testing";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FileUploadService } from "src/common/services/file-upload.service";
import { VerificationService } from "../verification/verification.service";
import { ProviderService } from "./provider.service";
import { UserRole } from "generated/prisma/client";

/**
 * The customer-profile gate. This endpoint returns a customer's phone number
 * and street address, so what counts as "we have a booking" is the whole of
 * its security.
 */
describe("ProviderService — getCustomerProfileForProvider", () => {
  let service: ProviderService;

  const prisma = {
    booking: { findFirst: jest.fn(), count: jest.fn() },
    user: { findUnique: jest.fn() },
    job: { count: jest.fn() },
    review: { findMany: jest.fn() },
  };

  const fileUpload = { deleteFile: jest.fn() };
  const verification = { getVerificationStatus: jest.fn() };

  const customer = {
    id: "cust1",
    fullName: "Ayesha Khan",
    phone: "03001234567",
    address: "House 12, Gulberg",
    profilePhoto: null,
    isActive: true,
    role: UserRole.CUSTOMER,
    roles: [UserRole.CUSTOMER],
    createdAt: new Date(),
    city: { id: "c1", name: "Lahore" },
    ratingSummary: null,
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    prisma.user.findUnique.mockResolvedValue(customer);
    prisma.booking.count.mockResolvedValue(0);
    prisma.job.count.mockResolvedValue(0);
    prisma.review.findMany.mockResolvedValue([]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProviderService,
        { provide: PrismaService, useValue: prisma },
        { provide: FileUploadService, useValue: fileUpload },
        { provide: VerificationService, useValue: verification },
      ],
    }).compile();
    service = module.get<ProviderService>(ProviderService);
  });

  /** What the gate query asked for on the last call. */
  const gateWhere = () => prisma.booking.findFirst.mock.calls[0][0].where;

  it("requires an accepted booking, not merely any booking", async () => {
    prisma.booking.findFirst.mockResolvedValue({ id: "b1" });

    await service.getCustomerProfileForProvider("prov1", "cust1");

    expect(gateWhere()).toEqual({
      providerId: "prov1",
      customerId: "cust1",
      acceptedAt: { not: null },
    });
  });

  it("refuses when the two have never had an accepted booking", async () => {
    prisma.booking.findFirst.mockResolvedValue(null);

    await expect(
      service.getCustomerProfileForProvider("prov1", "cust1"),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it("does not reach the customer record when refused", async () => {
    prisma.booking.findFirst.mockResolvedValue(null);

    await expect(
      service.getCustomerProfileForProvider("prov1", "cust1"),
    ).rejects.toThrow();

    // The refusal must come before anything is read, or a timing difference
    // still answers "is this a real customer?".
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
    expect(prisma.review.findMany).not.toHaveBeenCalled();
  });

  it("scopes the lookup to the calling provider", async () => {
    prisma.booking.findFirst.mockResolvedValue({ id: "b1" });

    await service.getCustomerProfileForProvider("prov1", "cust1");

    // Not taken from anything client-supplied beyond the customer id.
    expect(gateWhere().providerId).toBe("prov1");
  });

  it("404s a customer who has been deactivated or soft-deleted", async () => {
    prisma.booking.findFirst.mockResolvedValue({ id: "b1" });
    prisma.user.findUnique.mockResolvedValue({ ...customer, isActive: false });

    await expect(
      service.getCustomerProfileForProvider("prov1", "cust1"),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it("404s an id that belongs to a non-customer", async () => {
    prisma.booking.findFirst.mockResolvedValue({ id: "b1" });
    prisma.user.findUnique.mockResolvedValue({
      ...customer,
      role: UserRole.PROVIDER,
      roles: [UserRole.PROVIDER],
    });

    await expect(
      service.getCustomerProfileForProvider("prov1", "cust1"),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it("returns the contact details once the gate passes", async () => {
    prisma.booking.findFirst.mockResolvedValue({ id: "b1" });

    const profile = await service.getCustomerProfileForProvider(
      "prov1",
      "cust1",
    );

    expect(profile).toMatchObject({
      id: "cust1",
      fullName: "Ayesha Khan",
      phone: "03001234567",
      address: "House 12, Gulberg",
    });
  });

  it("counts only the asking provider's completed jobs in jobsWithYou", async () => {
    prisma.booking.findFirst.mockResolvedValue({ id: "b1" });

    await service.getCustomerProfileForProvider("prov1", "cust1");

    const scoped = prisma.booking.count.mock.calls.map(
      (c: [{ where: Record<string, unknown> }]) => c[0].where,
    );
    expect(scoped).toContainEqual(
      expect.objectContaining({ customerId: "cust1", providerId: "prov1" }),
    );
  });

  it("shows only approved, undeleted reviews about the customer", async () => {
    prisma.booking.findFirst.mockResolvedValue({ id: "b1" });

    await service.getCustomerProfileForProvider("prov1", "cust1");

    const { where } = prisma.review.findMany.mock.calls[0][0];
    expect(where).toMatchObject({ revieweeId: "cust1", deletedAt: null });
    expect(where.status).toBeDefined();
  });
});
