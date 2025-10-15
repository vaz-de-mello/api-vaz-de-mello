/*
  Warnings:

  - Added the required column `valor_restituicao` to the `precatorios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "precatorios" ADD COLUMN     "valor_restituicao" DECIMAL(65,30) NOT NULL;
