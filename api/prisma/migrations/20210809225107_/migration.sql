/*
  Warnings:

  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - The `status` column on the `Quote` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('QUOTE_REQUESTED', 'NEW_ORDER', 'PENDING_ORDER', 'SHIPPED', 'DELIVERED', 'IN_PROGESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "status",
ADD COLUMN     "status" "QuoteStatus" DEFAULT E'QUOTE_REQUESTED';
