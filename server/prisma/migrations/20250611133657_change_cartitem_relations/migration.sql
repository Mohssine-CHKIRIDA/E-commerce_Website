-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_colorId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_sizeId_fkey";

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "colorId" DROP NOT NULL,
ALTER COLUMN "sizeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE SET NULL ON UPDATE CASCADE;
