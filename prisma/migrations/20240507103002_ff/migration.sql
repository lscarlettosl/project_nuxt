-- AlterTable
ALTER TABLE "users" ADD COLUMN "password" TEXT;
ALTER TABLE "users" ADD COLUMN "role" TEXT DEFAULT 'user';
