/*
  Warnings:

  - Added the required column `status` to the `precatorios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "precatorios" ADD COLUMN     "status" INTEGER NOT NULL;
