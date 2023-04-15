-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "disableDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "endDate" DROP NOT NULL;
