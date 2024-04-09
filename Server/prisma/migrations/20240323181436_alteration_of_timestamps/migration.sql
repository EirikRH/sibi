-- AlterTable
ALTER TABLE "itemsforsale" ALTER COLUMN "date_posted" SET DEFAULT now() at time zone 'UTC+1';

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "date_posted" SET DEFAULT now() at time zone 'UTC+1',
ALTER COLUMN "date_posted" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "date_joined" SET DEFAULT now() at time zone 'UTC+1';
