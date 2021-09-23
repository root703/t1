-- CreateEnum
CREATE TYPE "RateType" AS ENUM ('HOURLY', 'DAILY', 'PROJECT');

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('TRANSMISSION', 'TRANSMISSION_FLUID');

-- CreateEnum
CREATE TYPE "FluidSize" AS ENUM ('QUART');

-- CreateTable
CREATE TABLE "LaborPrice" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rate" DOUBLE PRECISION NOT NULL,
    "type" "RateType" NOT NULL DEFAULT E'HOURLY',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepairShop" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "unit" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" INTEGER NOT NULL,
    "service_zips" INTEGER[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "unit" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "year" INTEGER NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "sub_model" TEXT NOT NULL,
    "vin" TEXT,
    "transmission_model" TEXT NOT NULL,
    "fluid_title" TEXT NOT NULL,
    "fluid_amount" DOUBLE PRECISION NOT NULL,
    "fluid_measurement" "FluidSize" NOT NULL DEFAULT E'QUART',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL,
    "category" "ProductCategory" DEFAULT E'TRANSMISSION',
    "vendor" TEXT,
    "cost" DOUBLE PRECISION NOT NULL,
    "unit_sale_price" DOUBLE PRECISION NOT NULL,
    "core_charge" DOUBLE PRECISION,
    "transmission_model" TEXT,
    "fluid_title" TEXT,
    "fluid_measurement" "FluidSize" DEFAULT E'QUART',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductQuote" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quote_id" INTEGER NOT NULL,

    PRIMARY KEY ("product_id","quote_id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "labor_time" DOUBLE PRECISION NOT NULL,
    "shipping_rate" DOUBLE PRECISION NOT NULL DEFAULT 200,
    "tax" DOUBLE PRECISION NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "repair_shop_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "quote_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductQuote" ADD FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductQuote" ADD FOREIGN KEY ("quote_id") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD FOREIGN KEY ("repair_shop_id") REFERENCES "RepairShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD FOREIGN KEY ("quote_id") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
