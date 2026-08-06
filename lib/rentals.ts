import "server-only";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/app/generated/prisma/client";

export type RentalWithPhotos = Prisma.RentalGetPayload<{ include: { photos: true } }>;

/** All rentals, published or not — for the Admin panel. */
export async function listRentals(): Promise<RentalWithPhotos[]> {
  return prisma.rental.findMany({
    include: { photos: { orderBy: { position: "asc" } } },
    orderBy: [{ published: "asc" }, { createdAt: "asc" }],
  });
}

/** Any rental by id, published or not — for the Admin panel. */
export async function getRental(id: string): Promise<RentalWithPhotos | null> {
  return prisma.rental.findUnique({
    where: { id },
    include: { photos: { orderBy: { position: "asc" } } },
  });
}

/** Published rentals only — for the public Rentals page. */
export async function listPublishedRentals(): Promise<RentalWithPhotos[]> {
  return prisma.rental.findMany({
    where: { published: true },
    include: { photos: { orderBy: { position: "asc" } } },
    orderBy: { createdAt: "asc" },
  });
}

/** A published rental by id, or null if it's a draft/missing — for the public detail page. */
export async function getPublishedRental(id: string): Promise<RentalWithPhotos | null> {
  return prisma.rental.findFirst({
    where: { id, published: true },
    include: { photos: { orderBy: { position: "asc" } } },
  });
}

export function amenitiesList(rental: RentalWithPhotos): string[] {
  return rental.amenities
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
}

export function hasLeaseDetails(rental: RentalWithPhotos): boolean {
  return !!(
    rental.petsPolicy ||
    rental.availableDate ||
    rental.leaseTerm ||
    rental.utilitiesIncluded ||
    rental.furnished
  );
}

/** Photo URL at a given gallery index (0 = main), or null if none was set. */
export function photoAt(rental: RentalWithPhotos, index: number): string | null {
  return rental.photos[index]?.url ?? null;
}
