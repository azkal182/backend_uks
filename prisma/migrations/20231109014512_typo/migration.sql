/*
  Warnings:

  - You are about to drop the column `coplaint` on the `checkIn` table. All the data in the column will be lost.
  - Added the required column `complaint` to the `checkIn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checkIn" DROP COLUMN "coplaint",
ADD COLUMN     "complaint" TEXT NOT NULL;
