/*
  Warnings:

  - A unique constraint covering the columns `[x,y]` on the table `Emplacement` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Emplacement_x_y_key" ON "Emplacement"("x", "y");
