/*
  Warnings:

  - The values [PULANG_ASRAMA,PULANG_RUMAH,MENGINAP_UKS,DIRAWAT_RS] on the enum `StatusCheckin` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusCheckin_new" AS ENUM ('ASRAMA', 'RUMAH', 'RS', 'UKS');
ALTER TABLE "checkIn" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "checkIn" ALTER COLUMN "status" TYPE "StatusCheckin_new" USING ("status"::text::"StatusCheckin_new");
ALTER TYPE "StatusCheckin" RENAME TO "StatusCheckin_old";
ALTER TYPE "StatusCheckin_new" RENAME TO "StatusCheckin";
DROP TYPE "StatusCheckin_old";
ALTER TABLE "checkIn" ALTER COLUMN "status" SET DEFAULT 'UKS';
COMMIT;

-- AlterTable
ALTER TABLE "checkIn" ALTER COLUMN "grade" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'UKS';
