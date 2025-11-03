/*
  Warnings:

  - You are about to drop the column `data_calculo` on the `precatorios` table. All the data in the column will be lost.
  - Added the required column `data_base` to the `precatorios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero_card` to the `precatorios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "precatorios" DROP COLUMN "data_calculo",
ADD COLUMN     "data_base" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "numero_card" TEXT NOT NULL;
