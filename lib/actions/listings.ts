"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/session";
import { fileToDataUrl } from "@/lib/file-to-data-url";

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

  const photoFiles = formData.getAll("newPhotos").filter((f) => f instanceof File && f.size > 0) as File[];
  let photoUrls: (string | null)[];
  try {
    photoUrls = await Promise.all(photoFiles.map((f) => fileToDataUrl(f)));
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Could not read an uploaded photo." };
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
        create: photoUrls.filter((url): url is string => !!url).map((url, i) => ({ url, position: i })),
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

  // The photo picker sends the full desired photo order: a mix of
  // "keepPhotoIds" (existing RentalPhoto ids to retain, in order) and
  // "newPhotos" (freshly uploaded files to append at the end, in order).
  // Anything not listed in keepPhotoIds is deleted.
  const keepIds = formData.getAll("keepPhotoIds").map(String);
  const newPhotoFiles = formData.getAll("newPhotos").filter((f) => f instanceof File && f.size > 0) as File[];

  let newPhotoUrls: (string | null)[];
  try {
    newPhotoUrls = await Promise.all(newPhotoFiles.map((f) => fileToDataUrl(f)));
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Could not read an uploaded photo." };
  }

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
        published: formData.get("published") === "on",
      },
    });

    // Remove any existing photo not present in keepIds.
    await tx.rentalPhoto.deleteMany({ where: { rentalId: id, id: { notIn: keepIds.length ? keepIds : ["__none__"] } } });

    // Re-number the kept photos to match the order the picker sent.
    for (let i = 0; i < keepIds.length; i++) {
      await tx.rentalPhoto.update({ where: { id: keepIds[i] }, data: { position: i } });
    }

    // Append newly uploaded photos after the kept ones.
    const validNewUrls = newPhotoUrls.filter((u): u is string => !!u);
    for (let i = 0; i < validNewUrls.length; i++) {
      await tx.rentalPhoto.create({ data: { rentalId: id, url: validNewUrls[i], position: keepIds.length + i } });
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
