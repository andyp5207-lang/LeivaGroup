"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { updateListingAction, type ListingFormState } from "@/lib/actions/listings";
import PhotoDropzone from "@/components/PhotoDropzone";
import type { RentalWithPhotos } from "@/lib/rentals";

const PHOTO_SLOTS = ["photo1", "photo2", "photo3", "photo4", "photo5", "photo6"];

export default function EditListingForm({ rental }: { rental: RentalWithPhotos }) {
  const [state, formAction, pending] = useActionState<ListingFormState, FormData>(updateListingAction, null);
  const router = useRouter();

  return (
    <form action={formAction} className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 40, alignItems: "start" }}>
      <input type="hidden" name="id" value={rental.id} />

      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap", paddingBottom: 16, borderBottom: "1px solid var(--color-divider)", marginBottom: 24 }}>
          <div className="field" style={{ width: 140 }}>
            <label>Rent</label>
            <input className="input" type="text" name="price" defaultValue={rental.price} />
          </div>
          <div className="field" style={{ width: 80 }}>
            <label>Beds</label>
            <input className="input" type="number" name="beds" min={0} defaultValue={rental.beds} />
          </div>
          <div className="field" style={{ width: 80 }}>
            <label>Baths</label>
            <input className="input" type="number" name="baths" min={0} defaultValue={rental.baths} />
          </div>
          <div className="field" style={{ width: 100 }}>
            <label>Sq Ft</label>
            <input className="input" type="text" name="sqft" defaultValue={rental.sqft} />
          </div>
        </div>

        <PhotoDropzone name="photo1" label="Main photo" initialUrl={rental.photos[0]?.url} aspectRatio="16/10" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10, marginTop: 10, marginBottom: 24 }}>
          {PHOTO_SLOTS.slice(1).map((slot, i) => (
            <PhotoDropzone key={slot} name={slot} label={`Photo ${i + 2}`} initialUrl={rental.photos[i + 1]?.url} aspectRatio="4/3" />
          ))}
        </div>

        <div className="field" style={{ marginBottom: 8 }}>
          <label>Address</label>
          <input className="input" type="text" name="address" defaultValue={rental.address} required style={{ fontSize: 22, fontFamily: "var(--font-heading)" }} />
        </div>
        <div className="field" style={{ marginBottom: 28 }}>
          <label>City / State</label>
          <input className="input" type="text" name="city" defaultValue={rental.city} />
        </div>

        <h4 style={{ fontSize: 18, marginBottom: 10 }}>What&rsquo;s Special</h4>
        <div className="field" style={{ marginBottom: 32 }}>
          <textarea className="input" rows={3} name="description" defaultValue={rental.description} />
        </div>

        <h4 style={{ fontSize: 18, marginBottom: 14, paddingTop: 8, borderTop: "1px solid var(--color-divider)" }}>Facts &amp; Features</h4>

        <SectionLabel>Interior</SectionLabel>
        <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 28 }}>
          <Field label="Heating" name="heating" defaultValue={rental.heating} />
          <Field label="Cooling" name="cooling" defaultValue={rental.cooling} />
          <Field label="Laundry" name="laundry" defaultValue={rental.laundry} />
          <Field label="Amenities (comma separated)" name="amenities" defaultValue={rental.amenities} placeholder="Ocean view, Private yard, 2-car garage" />
        </div>

        <SectionLabel>Property</SectionLabel>
        <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 28 }}>
          <Field label="Parking" name="parking" defaultValue={rental.parking} placeholder="2 Car Garage" />
          <Field label="Lot Size" name="lotSize" defaultValue={rental.lotSize} />
        </div>

        <SectionLabel>Construction &amp; HOA</SectionLabel>
        <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 8 }}>
          <Field label="Home Type" name="homeType" defaultValue={rental.homeType} placeholder="Single Family" />
          <Field label="Year Built" name="yearBuilt" defaultValue={rental.yearBuilt} />
          <Field label="HOA Fee" name="hoaFee" defaultValue={rental.hoaFee} placeholder="None" />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            padding: 16,
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-divider)",
            background: rental.published ? "var(--color-accent-100)" : "var(--color-bg)",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
            <input type="checkbox" name="published" defaultChecked={rental.published} style={{ width: 18, height: 18 }} />
            Published (visible on the public Rentals page)
          </label>
          {!rental.published && (
            <p className="text-muted" style={{ fontSize: 12, margin: "8px 0 0" }}>
              This is a draft — it won&rsquo;t show up on the live site until you check this and save.
            </p>
          )}
        </div>
        <div style={{ padding: 20, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-divider)", background: "var(--color-bg)" }}>
          <div className="text-muted" style={{ fontSize: 12, marginBottom: 10 }}>
            Listing Link
          </div>
          <Field label="Zillow Listing URL (optional)" name="zillowUrl" defaultValue={rental.zillowUrl} />
          <Field label="Pet Policy" name="petsPolicy" defaultValue={rental.petsPolicy} />
          <Field label="Available Date" name="availableDate" defaultValue={rental.availableDate} />
          <Field label="Lease Term" name="leaseTerm" defaultValue={rental.leaseTerm} />
          <Field label="Utilities Included" name="utilitiesIncluded" defaultValue={rental.utilitiesIncluded} />
          <Field label="Furnished" name="furnished" defaultValue={rental.furnished} />
        </div>
        {state?.error && <p style={{ color: "#b64545", fontSize: 13, margin: 0 }}>{state.error}</p>}
        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit" className="btn btn-primary" style={{ padding: "10px 24px", flex: 1 }} disabled={pending}>
            {pending ? "Saving…" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/listings")}
            style={{ border: "1px solid var(--color-divider)", background: "none", borderRadius: "var(--radius-md)", padding: "10px 24px", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--color-bg)", padding: "10px 16px", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: 14, marginBottom: 14 }}>
      {children}
    </div>
  );
}

function Field({ label, name, defaultValue, placeholder }: { label: string; name: string; defaultValue?: string; placeholder?: string }) {
  return (
    <div className="field" style={{ marginBottom: 8 }}>
      <label>{label}</label>
      <input className="input" type="text" name={name} defaultValue={defaultValue} placeholder={placeholder} />
    </div>
  );
}
