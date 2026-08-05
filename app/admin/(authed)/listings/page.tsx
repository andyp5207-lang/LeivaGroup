import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { listRentals } from "@/lib/rentals";
import { deleteListingAction } from "@/lib/actions/listings";

export const metadata: Metadata = { title: "Current Listings — Admin — Leiva Group" };
export const dynamic = "force-dynamic";

export default async function CurrentListingsPage() {
  const rentals = await listRentals();

  return (
    <div style={{ padding: 28, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-divider)", background: "var(--color-surface)", boxShadow: "var(--shadow-underglow)", marginBottom: 32 }}>
      <h4 style={{ marginBottom: 6 }}>Current Listings</h4>
      <p className="text-muted" style={{ fontSize: 13, marginBottom: 18 }}>
        Click Edit to change any detail, including photos.
      </p>
      {rentals.length === 0 && (
        <p className="text-muted" style={{ fontSize: 14 }}>
          No listings yet — create one from the &ldquo;Create Listing&rdquo; tab.
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {rentals.map((r) => (
          <div key={r.id} style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--color-divider)", background: "var(--color-bg)", overflow: "hidden" }}>
            <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "160px 1fr auto", gap: 18, alignItems: "center", padding: 14 }}>
              <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", aspectRatio: "4/3", position: "relative", background: "var(--color-accent-100)" }}>
                {r.photos[0] && <Image src={r.photos[0].url} alt={r.address} fill style={{ objectFit: "cover" }} unoptimized />}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{r.address}</div>
                <div className="text-muted" style={{ fontSize: 13 }}>
                  {r.price} · {r.beds} bd · {r.baths} ba · {r.sqft} sqft
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Link
                  href={`/admin/listings/${r.id}`}
                  style={{ border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", padding: "8px 16px", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "var(--color-accent-700)" }}
                >
                  Edit
                </Link>
                <form action={deleteListingAction}>
                  <input type="hidden" name="id" value={r.id} />
                  <button
                    type="submit"
                    style={{ border: "1px solid var(--color-divider)", background: "none", borderRadius: "var(--radius-md)", padding: "8px 16px", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#b64545" }}
                  >
                    Remove
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
