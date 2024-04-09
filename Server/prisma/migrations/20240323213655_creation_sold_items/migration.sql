/*
  Warnings:

  - You are about to drop the `sold_test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sold_test" DROP CONSTRAINT "sold_test_buyer_id_fkey";

-- DropForeignKey
ALTER TABLE "sold_test" DROP CONSTRAINT "sold_test_seller_id_fkey";

-- DropTable
DROP TABLE "sold_test";

-- DropTable
DROP TABLE "users_test";

-- CreateTable
CREATE TABLE "sold_items" (
    "id" SERIAL NOT NULL,
    "seller_id" INTEGER NOT NULL,
    "buyer_id" INTEGER NOT NULL,

    CONSTRAINT "sold_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sold_items" ADD CONSTRAINT "sold_items_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sold_items" ADD CONSTRAINT "sold_items_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
