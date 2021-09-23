-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "shipping_info_id" INTEGER,
ADD COLUMN     "shipping_type" TEXT;

-- CreateTable
CREATE TABLE "ShippingInfo" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company" TEXT,
    "street" TEXT,
    "unit" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quote" ADD FOREIGN KEY ("shipping_info_id") REFERENCES "ShippingInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
