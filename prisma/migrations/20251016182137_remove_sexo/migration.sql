/*
  Warnings:

  - You are about to drop the column `sexo` on the `clientes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "sexo";

-- DropEnum
DROP TYPE "Sexo";
