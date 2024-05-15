/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `laptops` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "laptops_number_key" ON "laptops"("number");
