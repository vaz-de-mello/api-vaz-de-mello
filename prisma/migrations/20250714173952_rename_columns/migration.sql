/*
  Warnings:

  - You are about to drop the column `data_cálculo` on the `restituicoes` table. All the data in the column will be lost.
  - You are about to drop the column `necessita_cálculo_judicial` on the `restituicoes` table. All the data in the column will be lost.
  - Added the required column `data_calculo` to the `restituicoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `necessita_calculo_judicial` to the `restituicoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restituicoes" DROP COLUMN "data_cálculo",
DROP COLUMN "necessita_cálculo_judicial",
ADD COLUMN     "data_calculo" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "necessita_calculo_judicial" BOOLEAN NOT NULL;

-- DropEnum
DROP TYPE "NecessitaCalculoJudicial";
