/*
  Warnings:

  - You are about to drop the column `labor_price_id` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the `ProductQuote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductQuote" DROP CONSTRAINT "ProductQuote_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductQuote" DROP CONSTRAINT "ProductQuote_quote_id_fkey";

-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_labor_price_id_fkey";

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "labor_price_id",
ADD COLUMN     "fluid_price" DOUBLE PRECISION,
ADD COLUMN     "labor_price" DOUBLE PRECISION,
ADD COLUMN     "transmission_price" DOUBLE PRECISION,
ALTER COLUMN "labor_time" DROP NOT NULL;

-- DropTable
DROP TABLE "ProductQuote";
