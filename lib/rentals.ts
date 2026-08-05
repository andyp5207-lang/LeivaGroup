import "server-only";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/app/generated/prisma/client";

export type RentalWithPhotos = Prisma.RentalGetPayload<{ include: { photos: true } }>;

export async function listRentals(): Promise<RentalWithPhotos[]> {
  return prisma.rental.findMany({
    include: { photos: { orderBy: { position: "asc" } } },
    orderBy: { createdAt: "asc" },
  });
}

export async function getRental(id: string): Promise<RentalWithPhotos | null> {
  return prisma.rental.findUnique({
    where: { id },
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
