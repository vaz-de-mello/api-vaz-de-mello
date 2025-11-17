/*
  Warnings:

  - Changed the type of `texto` on the `conversas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "conversas" DROP COLUMN "texto",
ADD COLUMN     "texto" JSONB NOT NULL;
