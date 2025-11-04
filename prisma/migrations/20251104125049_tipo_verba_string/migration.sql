/*
  Warnings:

  - Changed the type of `tipo_verba` on the `precatorios` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "precatorios" DROP COLUMN "tipo_verba",
ADD COLUMN     "tipo_verba" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TipoVerba";
