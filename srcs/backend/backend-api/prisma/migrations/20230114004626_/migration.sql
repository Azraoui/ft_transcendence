/*
  Warnings:

  - You are about to drop the column `admin` on the `room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[admins]` on the table `room` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[members]` on the table `room` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "room" DROP COLUMN "admin",
ADD COLUMN     "admins" INTEGER[];

-- CreateIndex
CREATE UNIQUE INDEX "room_admins_key" ON "room"("admins");

-- CreateIndex
CREATE UNIQUE INDEX "room_members_key" ON "room"("members");
