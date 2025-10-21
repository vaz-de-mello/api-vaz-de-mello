-- AlterTable
ALTER TABLE "pendencias" ADD COLUMN     "escritorio_id" TEXT;

-- AddForeignKey
ALTER TABLE "pendencias" ADD CONSTRAINT "pendencias_escritorio_id_fkey" FOREIGN KEY ("escritorio_id") REFERENCES "escritorios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
