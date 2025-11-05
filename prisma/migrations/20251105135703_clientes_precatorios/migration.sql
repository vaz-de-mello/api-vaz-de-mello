/*
  Warnings:

  - You are about to drop the column `doenca` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `doenca_grave` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `hipossuficiente` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `laudo_doenca` on the `clientes` table. All the data in the column will be lost.
  - Added the required column `doenca_grave` to the `precatorios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precatorio_derivado` to the `precatorios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "doenca",
DROP COLUMN "doenca_grave",
DROP COLUMN "hipossuficiente",
DROP COLUMN "laudo_doenca";

-- AlterTable
ALTER TABLE "precatorios" ADD COLUMN     "doenca" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "doenca_grave" BOOLEAN NOT NULL,
ADD COLUMN     "laudo_doenca" TEXT,
ADD COLUMN     "precatorio_derivado" TEXT NOT NULL;
