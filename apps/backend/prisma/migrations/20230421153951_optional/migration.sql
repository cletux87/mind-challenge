-- DropForeignKey
ALTER TABLE "TeamLog" DROP CONSTRAINT "TeamLog_personMoveId_fkey";

-- DropForeignKey
ALTER TABLE "TeamLog" DROP CONSTRAINT "TeamLog_teamMoveId_fkey";

-- AlterTable
ALTER TABLE "TeamLog" ALTER COLUMN "teamMoveId" DROP NOT NULL,
ALTER COLUMN "personMoveId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TeamLog" ADD CONSTRAINT "TeamLog_teamMoveId_fkey" FOREIGN KEY ("teamMoveId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamLog" ADD CONSTRAINT "TeamLog_personMoveId_fkey" FOREIGN KEY ("personMoveId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
