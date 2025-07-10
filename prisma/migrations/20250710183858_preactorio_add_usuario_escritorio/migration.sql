-- AlterTable
ALTER TABLE "precatorios" ADD COLUMN     "escritorio_id" TEXT,
ADD COLUMN     "usuario_id" TEXT;

-- AddForeignKey
ALTER TABLE "precatorios" ADD CONSTRAINT "precatorios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "precatorios" ADD CONSTRAINT "precatorios_escritorio_id_fkey" FOREIGN KEY ("escritorio_id") REFERENCES "escritorios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
