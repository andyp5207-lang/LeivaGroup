"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sendBookingNotification } from "@/lib/email";

export type BookingFormState = { error: string } | { success: true } | null;

export async function submitBookingAction(
  _prev: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  const date = String(formData.get("date") || "");
  const slot = String(formData.get("slot") || "");
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const reason = String(formData.get("reason") || "General Question");

  if (!date || !slot || !name || !email) {
    return { error: "Please fill in your name and email." };
  }

  const booking = await prisma.appointment.create({
    data: { date, slot, name, email, reason },
  });

  await sendBookingNotification(booking);

  revalidatePath("/admin/appointments");
  return { success: true };
}
