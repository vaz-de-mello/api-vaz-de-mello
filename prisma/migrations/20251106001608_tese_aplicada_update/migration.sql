/*
  Warnings:

  - Changed the type of `tese_aplicada` on the `precatorios` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "precatorios" DROP COLUMN "tese_aplicada",
ADD COLUMN     "tese_aplicada" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TeseAplicada";
