import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Appointments — Admin — Leiva Group" };
export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
  const bookings = await prisma.appointment.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div style={{ padding: 28, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-divider)", background: "var(--color-surface)", boxShadow: "var(--shadow-underglow)" }}>
      <h4 style={{ marginBottom: 14 }}>Appointment Requests</h4>
      {bookings.length === 0 ? (
        <p className="text-muted" style={{ fontSize: 14, margin: 0 }}>
          No appointment requests yet.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {bookings.map((b) => {
            const display =
              new Date(`${b.date}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" }) + " · " + b.slot;
            return (
              <div key={b.id} style={{ padding: 14, borderRadius: "var(--radius-md)", border: "1px solid var(--color-divider)", background: "var(--color-bg)" }}>
                <div style={{ fontWeight: 700, color: "var(--color-accent-700)" }}>{display}</div>
                <div className="text-muted" style={{ fontSize: 13 }}>
                  {b.name} ({b.email}) · {b.reason}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
