/*
  Warnings:

  - You are about to drop the column `hex` on the `ProductColor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ProductColor` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `ProductSize` table. All the data in the column will be lost.
  - Added the required column `colorId` to the `ProductColor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeId` to the `ProductSize` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductColor" DROP COLUMN "hex",
DROP COLUMN "name",
ADD COLUMN     "colorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductSize" DROP COLUMN "size",
ADD COLUMN     "sizeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hex" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductColor" ADD CONSTRAINT "ProductColor_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSize" ADD CONSTRAINT "ProductSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
