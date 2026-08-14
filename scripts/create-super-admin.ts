/**
 * Creates or promotes a super admin.
 *
 *   npx ts-node scripts/create-super-admin.ts <email> <password> [fullName] [phone]
 *
 * Existing user  -> promoted to ADMIN, password reset, given a super-admin row.
 * New email      -> a fresh ADMIN account is created.
 *
 * "Super admin" is an Admin row with an empty `permissions` array, which
 * PermissionsGuard already treats as unrestricted. The row is written
 * explicitly rather than relying on the no-row legacy fallback, so the account
 * still works once every admin has a real row.
 *
 * Point DATABASE_URL at the right database before running, e.g.
 *   set -a && . ./.env.migrate && set +a && npx ts-node scripts/create-super-admin.ts ...
 */
import * as bcrypt from "bcryptjs";
import {
  PrismaClient,
  AdminRole,
  UserRole,
  UserStatus,
} from "../generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  const [email, password, fullName, phone] = process.argv.slice(2);

  if (!email || !password) {
    throw new Error(
      "Usage: create-super-admin.ts <email> <password> [fullName] [phone]",
    );
  }
  if (
    password.length < 8 ||
    !/[A-Za-z]/.test(password) ||
    !/\d/.test(password)
  ) {
    throw new Error(
      "Password must be at least 8 characters and contain a letter and a number",
    );
  }

  const normalisedEmail = email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(password, 12);
  const existing = await prisma.user.findUnique({
    where: { email: normalisedEmail },
  });

  let userId: string;

  if (existing) {
    const updated = await prisma.user.update({
      where: { id: existing.id },
      data: {
        passwordHash,
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        emailVerified: true,
        deletedAt: null,
        isActive: true,
        ...(fullName ? { fullName } : {}),
      },
    });
    userId = updated.id;
    console.log(`Promoted existing user ${normalisedEmail} to ADMIN.`);
  } else {
    if (!fullName || !phone) {
      throw new Error(
        "This email is new, so fullName and phone are required:\n" +
          '  create-super-admin.ts <email> <password> "Full Name" <phone>',
      );
    }
    const phoneClash = await prisma.user.findFirst({ where: { phone } });
    if (phoneClash) {
      throw new Error(`Another account already uses the phone number ${phone}`);
    }
    const created = await prisma.user.create({
      data: {
        email: normalisedEmail,
        passwordHash,
        fullName,
        phone,
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        emailVerified: true,
        profileCompleted: true,
      },
    });
    userId = created.id;
    console.log(`Created new admin user ${normalisedEmail}.`);
  }

  await prisma.admin.upsert({
    where: { userId },
    create: {
      userId,
      role: AdminRole.SUPER_ADMIN,
      permissions: [], // empty = unrestricted
      isActive: true,
    },
    update: {
      role: AdminRole.SUPER_ADMIN,
      permissions: [],
      isActive: true,
    },
  });

  // Any session issued before the promotion carries the old role in its JWT.
  await prisma.refreshToken.deleteMany({ where: { userId } });

  console.log("\nSuper admin ready:");
  console.log(`  Email:    ${normalisedEmail}`);
  console.log("  Password: (the one you passed in)");
  console.log(`  User id:  ${userId}`);
  console.log(
    "\nSign in at your admin dashboard. Change the password from /profile.",
  );
}

main()
  .catch((error) => {
    console.error(
      `\n${error instanceof Error ? error.message : String(error)}`,
    );
    process.exitCode = 1;
  })
  .finally(() => void prisma.$disconnect());
