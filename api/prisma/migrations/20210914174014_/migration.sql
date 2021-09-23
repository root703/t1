-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('DIESEL', 'GAS');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "additional_info" TEXT,
ADD COLUMN     "extended_warranty" TEXT,
ADD COLUMN     "fuel_type" "FuelType" DEFAULT E'GAS',
ADD COLUMN     "standard_warranty" TEXT;
