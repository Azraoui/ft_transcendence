-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "opponent_fullName" TEXT NOT NULL,
    "opponent_imgUrl" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "gameMode" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
