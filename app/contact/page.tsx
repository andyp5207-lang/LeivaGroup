import type { Metadata } from "next";
import BookingCalendar from "@/components/BookingCalendar";

export const metadata: Metadata = {
  title: "Contact — Leiva Group",
  description: "Schedule a free, no-obligation consultation with Leiva Group.",
};

export default function ContactPage() {
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px 90px" }}>
      <h1 style={{ fontSize: 44, marginBottom: 16 }}>Schedule a time to talk.</h1>
      <p style={{ maxWidth: "60ch", opacity: 0.85, marginBottom: 40, fontSize: 17 }}>
        Pick an open date, choose a time, and we&rsquo;ll confirm your appointment — completely free, no obligation.
      </p>
      <BookingCalendar variant="contact" />
    </div>
  );
}
