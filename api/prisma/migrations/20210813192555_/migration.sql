/*
  Warnings:

  - A unique constraint covering the columns `[transmission_model]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fluid_title]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product.transmission_model_unique" ON "Product"("transmission_model");

-- CreateIndex
CREATE UNIQUE INDEX "Product.fluid_title_unique" ON "Product"("fluid_title");
