/*
  Warnings:

  - Added the required column `usuario` to the `documentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "documentos" ADD COLUMN     "usuario" TEXT NOT NULL;
