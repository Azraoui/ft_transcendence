/*
  Warnings:

  - You are about to drop the column `Muteds` on the `room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "room" DROP COLUMN "Muteds",
ADD COLUMN     "muteds" INTEGER[],
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'private';
