/*
  Warnings:

  - You are about to drop the column `diferença_IR` on the `restituicoes` table. All the data in the column will be lost.
  - Added the required column `diferenca_IR` to the `restituicoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restituicoes" DROP COLUMN "diferença_IR",
ADD COLUMN     "diferenca_IR" DECIMAL(65,30) NOT NULL;
