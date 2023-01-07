-- DropForeignKey
ALTER TABLE "friends" DROP CONSTRAINT "friends_friendId_fkey";

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
