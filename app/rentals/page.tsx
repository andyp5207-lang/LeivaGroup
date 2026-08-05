import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { listRentals } from "@/lib/rentals";

export const metadata: Metadata = {
  title: "Properties for Rent — Leiva Group",
  description: "Current South Bay rental availability from Leiva Group.",
};

export const dynamic = "force-dynamic";

function RentalPlaceholderArt() {
  return (
    <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.55 }} preserveAspectRatio="xMidYMid meet">
      <polygon points="50,22 84,48 78,48 78,80 22,80 22,48 16,48" fill="none" stroke="var(--color-accent-600)" strokeWidth={2.2} strokeLinejoin="round" />
      <rect x={44} y={60} width={12} height={20} fill="none" stroke="var(--color-accent-600)" strokeWidth={2} />
      <rect x={30} y={56} width={10} height={10} fill="none" stroke="var(--color-accent-600)" strokeWidth={2} />
      <rect x={60} y={56} width={10} height={10} fill="none" stroke="var(--color-accent-600)" strokeWidth={2} />
    </svg>
  );
}

export default async function RentalsPage() {
  const rentals = await listRentals();

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px 90px" }}>
      <h1 style={{ fontSize: 34, maxWidth: "20ch", marginBottom: 16 }}>Properties for Rent</h1>
      <p style={{ maxWidth: "60ch", opacity: 0.85, marginBottom: 40, fontSize: 17 }}>
        Current availability — reach out to schedule a tour or ask about a listing.
      </p>

      {rentals.length > 0 ? (
        <div className="mob-rentals-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
          {rentals.map((r) => {
            const mainPhoto = r.photos[0]?.url;
            return (
              <div key={r.id} className="card" style={{ overflow: "hidden", padding: 0 }}>
                <Link
                  href={`/rentals/${r.id}`}
                  className="mob-rentals-photo"
                  style={{
                    display: "block",
                    aspectRatio: "4/3",
                    position: "relative",
                    background: "linear-gradient(135deg, var(--color-accent-100), var(--color-accent-200))",
                  }}
                >
                  {mainPhoto ? (
                    <Image src={mainPhoto} alt={r.address} fill style={{ objectFit: "cover" }} unoptimized />
                  ) : (
                    <RentalPlaceholderArt />
                  )}
                </Link>
                <div style={{ padding: 22 }}>
                  <Link href={`/rentals/${r.id}`} className="card-title" style={{ fontSize: 19, display: "block", marginBottom: 8 }}>
                    {r.address}
                  </Link>
                  <div className="mob-rentals-meta-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 10 }}>
                    <span className="mob-rentals-price" style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 600, color: "var(--color-accent-700)" }}>
                      {r.price}
                    </span>
                    <span className="text-muted mob-rentals-beds" style={{ fontSize: 13 }}>
                      {r.beds} bd · {r.baths} ba
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Link href={`/rentals/${r.id}`} className="btn btn-secondary" style={{ padding: "12px 20px", flex: 1, textAlign: "center" }}>
                      Details
                    </Link>
                    <Link href="/#home-contact" className="btn btn-primary" style={{ padding: "12px 20px", flex: 1, textAlign: "center" }}>
                      Inquire
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-muted" style={{ fontSize: 16, padding: "48px 0", textAlign: "center" }}>
          No current properties for rent.
        </p>
      )}
    </div>
  );
}
