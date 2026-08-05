import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const DEMO_PHOTOS = [
  "/images/fake-photo-main.jpg",
  "/images/fake-photo-2.jpg",
  "/images/fake-photo-3.jpg",
  "/images/fake-photo-4.jpg",
  "/images/fake-photo-5.jpg",
  "/images/fake-photo-6.jpg",
];

const RENTALS = [
  {
    address: "1400 Ocean Dr, Manhattan Beach",
    city: "Manhattan Beach, CA",
    price: "$3,900/mo",
    beds: 3,
    baths: 2,
    sqft: "1,400",
    homeType: "Single Family",
    yearBuilt: "2001",
    parking: "2 Car Garage",
    lotSize: "3,600 sq ft",
    hoaFee: "None",
    laundry: "In-unit washer/dryer",
    cooling: "Central Air",
    heating: "Central, Gas",
    amenities: "Ocean view, Private yard, 2-car garage",
    description: "Sample listing with placeholder photos so you can preview the gallery layout.",
    photos: DEMO_PHOTOS,
  },
  {
    address: "220 Highland Ave, Manhattan Beach",
    city: "Manhattan Beach, CA",
    price: "$4,250/mo",
    beds: 2,
    baths: 2,
    sqft: "1,150",
    homeType: "Condo",
    yearBuilt: "2010",
    parking: "1 Assigned Space",
    lotSize: "—",
    hoaFee: "$250/mo",
    laundry: "In-unit washer/dryer",
    cooling: "Central Air",
    heating: "Central, Gas",
    amenities: "Rooftop deck, Walk to beach",
    description: "Sample listing for previewing the grid layout.",
    photos: [DEMO_PHOTOS[0]],
  },
  {
    address: "1830 Artesia Blvd, Torrance",
    city: "Torrance, CA",
    price: "$3,100/mo",
    beds: 3,
    baths: 2,
    sqft: "1,600",
    homeType: "Townhouse",
    yearBuilt: "2015",
    parking: "2 Car Garage",
    lotSize: "2,800 sq ft",
    hoaFee: "$150/mo",
    laundry: "In-unit washer/dryer",
    cooling: "Central Air",
    heating: "Central, Gas",
    amenities: "Community pool",
    description: "Sample listing for previewing the grid layout.",
    photos: [DEMO_PHOTOS[0]],
  },
  {
    address: "512 Prospect Ave, Hermosa Beach",
    city: "Hermosa Beach, CA",
    price: "$5,600/mo",
    beds: 4,
    baths: 3,
    sqft: "2,100",
    homeType: "Single Family",
    yearBuilt: "1998",
    parking: "2 Car Garage",
    lotSize: "4,000 sq ft",
    hoaFee: "None",
    laundry: "In-unit washer/dryer",
    cooling: "Central Air",
    heating: "Central, Gas",
    amenities: "Ocean view, Large backyard",
    description: "Sample listing for previewing the grid layout.",
    photos: [DEMO_PHOTOS[0]],
  },
];

async function main() {
  const existing = await prisma.rental.count();
  if (existing > 0) {
    console.log(`Skipping seed — ${existing} rental(s) already in the database.`);
    return;
  }

  for (const r of RENTALS) {
    const { photos, ...data } = r;
    await prisma.rental.create({
      data: { ...data, photos: { create: photos.map((url, i) => ({ url, position: i })) } },
    });
  }
  console.log(`Seeded ${RENTALS.length} demo rentals.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
