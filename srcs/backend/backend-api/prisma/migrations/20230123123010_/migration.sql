/*
  Warnings:

  - You are about to drop the column `active` on the `room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "room" DROP COLUMN "active";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "active" TEXT NOT NULL DEFAULT 'off';
