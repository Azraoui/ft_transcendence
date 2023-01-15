/*
  Warnings:

  - You are about to drop the column `muteds` on the `room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "room" DROP COLUMN "muteds";

-- AddForeignKey
ALTER TABLE "mutedUser" ADD CONSTRAINT "mutedUser_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
