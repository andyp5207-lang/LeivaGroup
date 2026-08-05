-- CreateTable
CREATE TABLE "Rental" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'South Bay, CA',
    "price" TEXT NOT NULL,
    "beds" INTEGER NOT NULL DEFAULT 0,
    "baths" INTEGER NOT NULL DEFAULT 0,
    "sqft" TEXT NOT NULL DEFAULT '',
    "homeType" TEXT NOT NULL DEFAULT '',
    "yearBuilt" TEXT NOT NULL DEFAULT '',
    "parking" TEXT NOT NULL DEFAULT '',
    "lotSize" TEXT NOT NULL DEFAULT '',
    "hoaFee" TEXT NOT NULL DEFAULT '',
    "laundry" TEXT NOT NULL DEFAULT '',
    "cooling" TEXT NOT NULL DEFAULT '',
    "heating" TEXT NOT NULL DEFAULT '',
    "amenities" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "zillowUrl" TEXT NOT NULL DEFAULT '',
    "petsPolicy" TEXT NOT NULL DEFAULT '',
    "availableDate" TEXT NOT NULL DEFAULT '',
    "leaseTerm" TEXT NOT NULL DEFAULT '',
    "utilitiesIncluded" TEXT NOT NULL DEFAULT '',
    "furnished" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalPhoto" (
    "id" TEXT NOT NULL,
    "rentalId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RentalPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "slot" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "reason" TEXT NOT NULL DEFAULT 'General Question',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RentalPhoto_rentalId_idx" ON "RentalPhoto"("rentalId");

-- AddForeignKey
ALTER TABLE "RentalPhoto" ADD CONSTRAINT "RentalPhoto_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rental"("id") ON DELETE CASCADE ON UPDATE CASCADE;
