/*
  Warnings:

  - A unique constraint covering the columns `[StationId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_StationId_key" ON "User"("StationId");
