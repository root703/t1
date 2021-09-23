/*
  Warnings:

  - You are about to drop the column `vin` on the `Vehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "vin" TEXT;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "vin";
