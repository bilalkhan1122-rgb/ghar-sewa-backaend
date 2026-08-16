-- CreateTable
CREATE TABLE "company_payment_accounts" (
    "id" TEXT NOT NULL,
    "method" "payment_method" NOT NULL,
    "accountName" VARCHAR(120) NOT NULL,
    "accountNumber" VARCHAR(60) NOT NULL,
    "bankName" VARCHAR(120),
    "instructions" VARCHAR(500),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_payment_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "company_payment_accounts_isActive_displayOrder_idx" ON "company_payment_accounts"("isActive", "displayOrder");
