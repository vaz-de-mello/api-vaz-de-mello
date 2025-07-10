-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_escritorio_id_fkey";

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "escritorio_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_escritorio_id_fkey" FOREIGN KEY ("escritorio_id") REFERENCES "escritorios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
