-- DropForeignKey
ALTER TABLE "precatorios" DROP CONSTRAINT "precatorios_cliente_id_fkey";

-- AddForeignKey
ALTER TABLE "precatorios" ADD CONSTRAINT "precatorios_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
