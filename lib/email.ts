import "server-only";
import { Resend } from "resend";

export async function sendBookingNotification(booking: {
  date: string;
  slot: string;
  name: string;
  email: string;
  reason: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL || "info.andyperez@gmail.com";
  if (!apiKey) {
    console.log("[email] RESEND_API_KEY not set — skipping booking notification email.", booking);
    return;
  }

  const resend = new Resend(apiKey);
  const dateDisplay = new Date(`${booking.date}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  try {
    const { data, error } = await resend.emails.send({
      from: "Leiva Group Website <onboarding@resend.dev>",
      to,
      replyTo: booking.email,
      subject: `New appointment request — ${dateDisplay} at ${booking.slot}`,
      text: [
        `New appointment request from the Leiva Group website:`,
        ``,
        `Name: ${booking.name}`,
        `Email: ${booking.email}`,
        `Reason: ${booking.reason}`,
        `Requested time: ${dateDisplay} at ${booking.slot}`,
      ].join("\n"),
    });
    // The Resend SDK doesn't throw for rejected sends — it returns `error`
    // instead, so this check is required or failures go unnoticed.
    if (error) {
      console.error("[email] Resend rejected the booking notification:", error);
    } else {
      console.log("[email] Booking notification sent:", data?.id);
    }
  } catch (err) {
    // Never let an email failure block the booking from saving.
    console.error("[email] Failed to send booking notification:", err);
  }
}
