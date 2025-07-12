/*
  Warnings:

  - You are about to drop the column `doença_grave` on the `clientes` table. All the data in the column will be lost.
  - Added the required column `doenca_grave` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "doença_grave",
ADD COLUMN     "doenca_grave" BOOLEAN NOT NULL;
