/*
  Warnings:

  - You are about to drop the column `titulo` on the `pendencias` table. All the data in the column will be lost.
  - Added the required column `conteudo` to the `pendencias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pendencias" DROP COLUMN "titulo",
ADD COLUMN     "conteudo" JSONB NOT NULL;
