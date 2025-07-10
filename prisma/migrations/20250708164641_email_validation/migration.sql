-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "email_token" TEXT,
ADD COLUMN     "email_verificado" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "status" DROP DEFAULT;
