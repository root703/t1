-- CreateEnum
CREATE TYPE "WarrantyType" AS ENUM ('STANDARD', 'UPGRADED');

-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "wrranty_type" "WarrantyType" NOT NULL DEFAULT E'STANDARD';
