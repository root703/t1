-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "labor_price_id" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "customer_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Quote" ADD FOREIGN KEY ("labor_price_id") REFERENCES "LaborPrice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
