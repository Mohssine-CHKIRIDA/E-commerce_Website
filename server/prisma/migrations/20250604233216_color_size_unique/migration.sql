/*
  Warnings:

  - A unique constraint covering the columns `[hex]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `Size` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Color_hex_key" ON "Color"("hex");

-- CreateIndex
CREATE UNIQUE INDEX "Size_value_key" ON "Size"("value");
