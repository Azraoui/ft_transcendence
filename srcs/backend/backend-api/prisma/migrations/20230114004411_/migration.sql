/*
  Warnings:

  - A unique constraint covering the columns `[roomName]` on the table `directMsg` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomName` to the `directMsg` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "directMsg" ADD COLUMN     "roomName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "owner" INTEGER,
    "admin" INTEGER[],
    "members" INTEGER[],

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "room_name_key" ON "room"("name");

-- CreateIndex
CREATE UNIQUE INDEX "directMsg_roomName_key" ON "directMsg"("roomName");
