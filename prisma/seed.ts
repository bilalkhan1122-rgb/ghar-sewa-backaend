import {
  PrismaClient,
  UserRole,
  UserStatus,
  VerificationStatus,
  WalletType,
} from "../generated/prisma/client";
import * as bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { SERVICE_CATALOGUE } from "./service-catalogue";

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Use 12 rounds for bcrypt as per security standards
  const adminPassword = await bcrypt.hash("Admin@123", 12);

  // Create cities
  const cities = await Promise.all([
    prisma.city.upsert({
      where: { id: "city-lahore" },
      update: {},
      create: { id: "city-lahore", name: "Lahore" },
    }),
    prisma.city.upsert({
      where: { id: "city-karachi" },
      update: {},
      create: { id: "city-karachi", name: "Karachi" },
    }),
    prisma.city.upsert({
      where: { id: "city-islamabad" },
      update: {},
      create: { id: "city-islamabad", name: "Islamabad" },
    }),
    prisma.city.upsert({
      where: { id: "city-rawalpindi" },
      update: {},
      create: { id: "city-rawalpindi", name: "Rawalpindi" },
    }),
  ]);

  console.log(`✅ Created ${cities.length} cities`);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      phone: "+923001234567",
      passwordHash: adminPassword,
      fullName: "Admin User",
      role: UserRole.ADMIN,
      roles: [UserRole.ADMIN],
      activeRole: UserRole.ADMIN,
      cityId: "city-lahore",
      status: UserStatus.ACTIVE,
      profileCompleted: true,
      verificationStatus: VerificationStatus.APPROVED,
      isActive: true,
    },
  });

  // Create a sample customer
  const customerPassword = await bcrypt.hash("Customer@123", 12);
  const customer = await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      email: "customer@example.com",
      phone: "+923007654321",
      passwordHash: customerPassword,
      fullName: "Test Customer",
      role: UserRole.CUSTOMER,
      roles: [UserRole.CUSTOMER],
      activeRole: UserRole.CUSTOMER,
      cityId: "city-karachi",
      address: "123 Main Street, Karachi",
      status: UserStatus.ACTIVE,
      profileCompleted: true,
      verificationStatus: VerificationStatus.APPROVED,
      isActive: true,
    },
  });

  // Create a sample provider
  const providerPassword = await bcrypt.hash("Provider@123", 12);
  const provider = await prisma.user.upsert({
    where: { email: "provider@example.com" },
    update: {},
    create: {
      email: "provider@example.com",
      phone: "+923011122233",
      passwordHash: providerPassword,
      fullName: "Test Provider",
      role: UserRole.PROVIDER,
      roles: [UserRole.PROVIDER],
      activeRole: UserRole.PROVIDER,
      cityId: "city-islamabad",
      status: UserStatus.ACTIVE,
      profileCompleted: false,
      verificationStatus: VerificationStatus.INCOMPLETE,
      isActive: true,
    },
  });

  // ─── Wallets (Module 14) ──────────────────────────────────────────────

  // Every registered user automatically has a wallet per role they hold.
  await prisma.wallet.upsert({
    where: {
      userId_type: { userId: customer.id, type: WalletType.CUSTOMER },
    },
    update: {},
    create: { userId: customer.id, type: WalletType.CUSTOMER },
  });
  await prisma.wallet.upsert({
    where: {
      userId_type: { userId: provider.id, type: WalletType.PROVIDER },
    },
    update: {},
    create: { userId: provider.id, type: WalletType.PROVIDER },
  });

  console.log("✅ Created wallets for customer & provider");

  // ─── Service Categories ──────────────────────────────────────────────

  const categoryData = SERVICE_CATALOGUE;

  /**
   * Same rule the API applies when an admin types a subcategory name, so a
   * seeded sub-type and one added through the dashboard get the same slug.
   */
  const slugify = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .replace(/-+/g, "-");

  let categoriesCreated = 0;
  let subcategoriesCreated = 0;
  for (const cat of categoryData) {
    const category = await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        description: cat.description,
        displayOrder: cat.displayOrder,
        isActive: true,
      },
    });
    categoriesCreated++;

    // `update: {}` throughout — re-running the seed must not undo renames or
    // reordering an admin has done in the dashboard.
    for (const [index, name] of cat.subcategories.entries()) {
      await prisma.serviceSubcategory.upsert({
        where: {
          categoryId_slug: { categoryId: category.id, slug: slugify(name) },
        },
        update: {},
        create: {
          categoryId: category.id,
          name,
          slug: slugify(name),
          displayOrder: index + 1,
          isActive: true,
        },
      });
      subcategoriesCreated++;
    }
  }

  console.log(`✅ Created ${categoriesCreated} service categories`);
  console.log(`✅ Created ${subcategoriesCreated} service subcategories`);

  // ─── Done ─────────────────────────────────────────────────────────────

  console.log("✅ Seeding completed");
  console.log("\n📋 Test Credentials:");
  console.log("===================");
  console.log("Admin User:");
  console.log("  Email:", admin.email);
  console.log("  Password: Admin@123");
  console.log("  Role:", admin.role);
  console.log("\nCustomer:");
  console.log("  Email:", customer.email);
  console.log("  Password: Customer@123");
  console.log("  Role:", customer.role);
  console.log("\nProvider:");
  console.log("  Email:", provider.email);
  console.log("  Password: Provider@123");
  console.log("  Role:", provider.role);
  console.log("\n⚠️  Passwords meet validation requirements:");
  console.log("   - Minimum 8 characters");
  console.log("   - At least one uppercase letter");
  console.log("   - At least one lowercase letter");
  console.log("   - At least one number");
  console.log("   - At least one special character");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
