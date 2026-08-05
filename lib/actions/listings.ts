"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/session";
import { fileToDataUrl } from "@/lib/file-to-data-url";

const PHOTO_FIELDS = ["photo1", "photo2", "photo3", "photo4", "photo5", "photo6"];

async function requireAdmin() {
  if (!(await isAdminAuthed())) {
    throw new Error("Not authorized.");
  }
}

export type ListingFormState = { error: string } | null;

export async function createListingAction(
  _prev: ListingFormState,
  formData: FormData
): Promise<ListingFormState> {
  await requireAdmin();

  const address = String(formData.get("address") || "").trim();
  if (!address) return { error: "Address is required." };

  const photoUrls: string[] = [];
  try {
    for (const field of PHOTO_FIELDS) {
      const url = await fileToDataUrl(formData.get(field));
      if (url) photoUrls.push(url);
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Could not read uploaded photo." };
  }

  await prisma.rental.create({
    data: {
      address,
      price: String(formData.get("price") || ""),
      beds: Number(formData.get("beds")) || 0,
      baths: Number(formData.get("baths")) || 0,
      sqft: String(formData.get("sqft") || ""),
      description: String(formData.get("description") || ""),
      zillowUrl: String(formData.get("zillowUrl") || ""),
      petsPolicy: String(formData.get("petsPolicy") || ""),
      availableDate: String(formData.get("availableDate") || ""),
      leaseTerm: String(formData.get("leaseTerm") || ""),
      utilitiesIncluded: String(formData.get("utilitiesIncluded") || ""),
      furnished: String(formData.get("furnished") || ""),
      city: "South Bay, CA",
      homeType: "Residential",
      photos: {
        create: photoUrls.map((url, i) => ({ url, position: i })),
      },
    },
  });

  revalidatePath("/rentals");
  revalidatePath("/admin/listings");
  revalidatePath("/");
  return null;
}

export async function updateListingAction(
  _prev: ListingFormState,
  formData: FormData
): Promise<ListingFormState> {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const address = String(formData.get("address") || "").trim();
  if (!id || !address) return { error: "Address is required." };

  let newPhotoUrls: (string | null)[];
  try {
    newPhotoUrls = await Promise.all(PHOTO_FIELDS.map((f) => fileToDataUrl(formData.get(f))));
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Could not read uploaded photo." };
  }

  const existing = await prisma.rentalPhoto.findMany({
    where: { rentalId: id },
    orderBy: { position: "asc" },
  });

  await prisma.$transaction(async (tx) => {
    await tx.rental.update({
      where: { id },
      data: {
        address,
        city: String(formData.get("city") || "South Bay, CA"),
        price: String(formData.get("price") || ""),
        beds: Number(formData.get("beds")) || 0,
        baths: Number(formData.get("baths")) || 0,
        sqft: String(formData.get("sqft") || ""),
        homeType: String(formData.get("homeType") || ""),
        yearBuilt: String(formData.get("yearBuilt") || ""),
        parking: String(formData.get("parking") || ""),
        lotSize: String(formData.get("lotSize") || ""),
        hoaFee: String(formData.get("hoaFee") || ""),
        laundry: String(formData.get("laundry") || ""),
        cooling: String(formData.get("cooling") || ""),
        heating: String(formData.get("heating") || ""),
        amenities: String(formData.get("amenities") || ""),
        description: String(formData.get("description") || ""),
        zillowUrl: String(formData.get("zillowUrl") || ""),
        petsPolicy: String(formData.get("petsPolicy") || ""),
        availableDate: String(formData.get("availableDate") || ""),
        leaseTerm: String(formData.get("leaseTerm") || ""),
        utilitiesIncluded: String(formData.get("utilitiesIncluded") || ""),
        furnished: String(formData.get("furnished") || ""),
      },
    });

    for (let i = 0; i < PHOTO_FIELDS.length; i++) {
      const url = newPhotoUrls[i];
      if (!url) continue; // no replacement uploaded for this slot — keep existing
      const current = existing[i];
      if (current) {
        await tx.rentalPhoto.update({ where: { id: current.id }, data: { url } });
      } else {
        await tx.rentalPhoto.create({ data: { rentalId: id, url, position: i } });
      }
    }
  });

  revalidatePath("/rentals");
  revalidatePath(`/rentals/${id}`);
  revalidatePath("/admin/listings");
  revalidatePath("/");
  return null;
}

export async function deleteListingAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.rental.delete({ where: { id } });
  revalidatePath("/rentals");
  revalidatePath("/admin/listings");
  revalidatePath("/");
}
