-- AlterTable
ALTER TABLE "itemsforsale" ALTER COLUMN "date_posted" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "date_posted" DROP DEFAULT,
ALTER COLUMN "date_posted" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "date_joined" DROP DEFAULT;
