/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `TeamLog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TeamLog_id_key" ON "TeamLog"("id");
