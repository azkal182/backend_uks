-- CreateEnum
CREATE TYPE "StatusCheckin" AS ENUM ('PULANG_ASRAMA', 'PULANG_RUMAH', 'MENGINAP_UKS', 'DIRAWAT_RS');

-- CreateTable
CREATE TABLE "checkIn" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "grade" TEXT NOT NULL,
    "coplaint" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "return_at" TIMESTAMP(3),
    "status" "StatusCheckin" NOT NULL DEFAULT 'MENGINAP_UKS',

    CONSTRAINT "checkIn_pkey" PRIMARY KEY ("id")
);
