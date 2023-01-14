-- CreateTable
CREATE TABLE "directMsg" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "recieverId" INTEGER NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "directMsg_pkey" PRIMARY KEY ("id")
);
