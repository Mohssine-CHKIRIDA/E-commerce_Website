/*
  Warnings:

  - You are about to drop the column `color` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `CartItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,productId,colorId,sizeId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `colorId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CartItem_userId_productId_color_size_key";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "color",
DROP COLUMN "size",
ADD COLUMN     "colorId" INTEGER NOT NULL,
ADD COLUMN     "sizeId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_userId_productId_colorId_sizeId_key" ON "CartItem"("userId", "productId", "colorId", "sizeId");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
