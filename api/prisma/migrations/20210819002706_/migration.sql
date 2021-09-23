/*
  Warnings:

  - You are about to drop the column `wrranty_type` on the `Quote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "wrranty_type",
ADD COLUMN     "warranty_type" "WarrantyType" NOT NULL DEFAULT E'STANDARD';
