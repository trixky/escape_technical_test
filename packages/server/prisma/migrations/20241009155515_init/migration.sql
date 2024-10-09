-- CreateTable
CREATE TABLE "Emplacement" (
    "id" SERIAL NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Emplacement_pkey" PRIMARY KEY ("id")
);
