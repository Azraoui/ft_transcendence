/*
  Warnings:

  - You are about to drop the column `data` on the `directMsg` table. All the data in the column will be lost.
  - You are about to drop the column `recieverId` on the `directMsg` table. All the data in the column will be lost.
  - Added the required column `text` to the `directMsg` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "room_admins_key";

-- DropIndex
DROP INDEX "room_members_key";

-- AlterTable
ALTER TABLE "directMsg" DROP COLUMN "data",
DROP COLUMN "recieverId",
ADD COLUMN     "text" TEXT NOT NULL;
