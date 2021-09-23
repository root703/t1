-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "additional_info" TEXT;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "fuel_type" "FuelType" DEFAULT E'GAS';
