import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedRental, amenitiesList, hasLeaseDetails } from "@/lib/rentals";
import RentalGallery from "@/components/RentalGallery";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/rentals/[id]">): Promise<Metadata> {
  const { id } = await params;
  const rental = await getPublishedRental(id);
  if (!rental) return { title: "Rental not found — Leiva Group" };
  return { title: `${rental.address} — Leiva Group`, description: rental.description || undefined };
}

export default async function RentalDetailPage({ params }: PageProps<"/rentals/[id]">) {
  const { id } = await params;
  const rental = await getPublishedRental(id);
  if (!rental) notFound();

  const photos = rental.photos.map((p) => p.url);
  const amenities = amenitiesList(rental);
  const leaseDetails = hasLeaseDetails(rental);

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 24px 90px" }}>
      <Link href="/rentals" style={{ fontSize: 14, fontWeight: 600, color: "var(--color-accent-700)", display: "inline-block", marginBottom: 20 }}>
        ← Back to all rentals
      </Link>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, padding: "16px 0 20px", borderBottom: "1px solid var(--color-divider)", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: 32, fontWeight: 700 }}>{rental.price}</span>
          <span style={{ fontSize: 15 }} className="text-muted">
            <strong style={{ color: "var(--color-text)" }}>{rental.beds}</strong> bds
          </span>
          <span style={{ fontSize: 15 }} className="text-muted">
            <strong style={{ color: "var(--color-text)" }}>{rental.baths}</strong> ba
          </span>
          <span style={{ fontSize: 15 }} className="text-muted">
            <strong style={{ color: "var(--color-text)" }}>{rental.sqft}</strong> sqft
          </span>
        </div>
        <ShareButton />
      </div>

      <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 40, alignItems: "start" }}>
        <div>
          <RentalGallery photos={photos} address={rental.address} />

          <h1 style={{ fontSize: 26, marginBottom: 6 }}>{rental.address}</h1>
          <p className="text-muted" style={{ fontSize: 15, marginBottom: 32 }}>
            {rental.city}
          </p>

          {rental.description && (
            <>
              <h2 style={{ fontSize: 22, marginBottom: 14 }}>What&rsquo;s Special</h2>
              <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.9, marginBottom: 36 }}>{rental.description}</p>
            </>
          )}

          <h2 style={{ fontSize: 22, marginBottom: 18, paddingTop: 8, borderTop: "1px solid var(--color-divider)" }}>Facts &amp; Features</h2>

          <SectionLabel>Interior</SectionLabel>
          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
            <FactBlock label="Bedrooms & Bathrooms">
              <FactLine>Bedrooms: {rental.beds}</FactLine>
              <FactLine>Bathrooms: {rental.baths}</FactLine>
            </FactBlock>
            <FactBlock label="Heating & Cooling">
              <FactLine>Cooling: {rental.cooling || "—"}</FactLine>
              <FactLine>Heating: {rental.heating || "—"}</FactLine>
            </FactBlock>
            <FactBlock label="Laundry">
              <FactLine>{rental.laundry || "—"}</FactLine>
            </FactBlock>
            {amenities.length > 0 && (
              <FactBlock label="Amenities">
                {amenities.map((a) => (
                  <FactLine key={a}>• {a}</FactLine>
                ))}
              </FactBlock>
            )}
          </div>

          <SectionLabel>Property</SectionLabel>
          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
            <FactBlock label="Parking">
              <FactLine>{rental.parking || "—"}</FactLine>
            </FactBlock>
            <FactBlock label="Lot">
              <FactLine>Size: {rental.lotSize || "—"}</FactLine>
            </FactBlock>
          </div>

          <SectionLabel>Construction &amp; HOA</SectionLabel>
          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 8 }}>
            <FactBlock label="Type & Age">
              <FactLine>Home type: {rental.homeType || "—"}</FactLine>
              <FactLine>Year built: {rental.yearBuilt || "—"}</FactLine>
            </FactBlock>
            <FactBlock label="HOA">
              <FactLine>Fee: {rental.hoaFee || "—"}</FactLine>
            </FactBlock>
          </div>

          {leaseDetails && (
            <>
              <SectionLabel>Lease Details</SectionLabel>
              <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 8 }}>
                {rental.petsPolicy && (
                  <FactBlock label="Pet Policy">
                    <FactLine>{rental.petsPolicy}</FactLine>
                  </FactBlock>
                )}
                {rental.availableDate && (
                  <FactBlock label="Available">
                    <FactLine>{rental.availableDate}</FactLine>
                  </FactBlock>
                )}
                {rental.leaseTerm && (
                  <FactBlock label="Lease Term">
                    <FactLine>{rental.leaseTerm}</FactLine>
                  </FactBlock>
                )}
                {rental.utilitiesIncluded && (
                  <FactBlock label="Utilities Included">
                    <FactLine>{rental.utilitiesIncluded}</FactLine>
                  </FactBlock>
                )}
                {rental.furnished && (
                  <FactBlock label="Furnished">
                    <FactLine>{rental.furnished}</FactLine>
                  </FactBlock>
                )}
              </div>
            </>
          )}
        </div>

        <div className="mob-sticky-off" style={{ position: "sticky", top: 88, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-divider)", background: "var(--color-surface)", boxShadow: "var(--shadow-underglow)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 26, fontWeight: 700, color: "var(--color-accent-700)", marginBottom: 14 }}>
              {rental.price}
            </div>
            <div className="text-muted" style={{ fontSize: 12, marginBottom: 10 }}>
              Listed by
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Image
                src="/images/leiva-group-logo.png"
                alt="Leiva Group"
                width={36}
                height={36}
                style={{ height: 36, width: 36, objectFit: "contain", borderRadius: "50%", background: "var(--color-accent-100)", padding: 4 }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Leiva Group</div>
                <div className="text-muted" style={{ fontSize: 12 }}>
                  Property Management
                </div>
              </div>
            </div>
            <Link href="/#home-contact" className="btn btn-secondary btn-block" style={{ padding: 12, marginBottom: 10 }}>
              Contact Leiva Group
            </Link>
            <Link href="/#home-contact" className="btn btn-primary btn-block" style={{ padding: 12 }}>
              Request a Tour
            </Link>
            {rental.zillowUrl && (
              <a href={rental.zillowUrl} target="_blank" rel="noopener" className="btn btn-secondary btn-block" style={{ padding: 12, marginTop: 10 }}>
                View on Zillow ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--color-surface)", padding: "10px 16px", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: 15, marginBottom: 16 }}>
      {children}
    </div>
  );
}

function FactBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{label}</div>
      {children}
    </div>
  );
}

function FactLine({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 14, margin: "0 0 4px", opacity: 0.85 }}>{children}</p>
  );
}

function ShareButton() {
  return (
    <button
      type="button"
      style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", padding: "9px 16px", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-body)" }}
    >
      ⇪ Share
    </button>
  );
}
