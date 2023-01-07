/*
  Warnings:

  - You are about to drop the `UserFriends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UserFriends";

-- CreateTable
CREATE TABLE "friends" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "friendId" INTEGER NOT NULL,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
