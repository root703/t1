-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL;
