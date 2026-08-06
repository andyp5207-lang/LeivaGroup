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
    await resend.emails.send({
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
  } catch (err) {
    // Never let an email failure block the booking from saving.
    console.error("[email] Failed to send booking notification:", err);
  }
}
