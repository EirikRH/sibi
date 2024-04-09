-- CreateTable
CREATE TABLE "sold_test" (
    "id" SERIAL NOT NULL,
    "seller_id" INTEGER NOT NULL,
    "buyer_id" INTEGER NOT NULL,

    CONSTRAINT "sold_test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_test" (
    "id" SERIAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_test_id_key" ON "users_test"("id");

-- AddForeignKey
ALTER TABLE "sold_test" ADD CONSTRAINT "sold_test_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users_test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sold_test" ADD CONSTRAINT "sold_test_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users_test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
