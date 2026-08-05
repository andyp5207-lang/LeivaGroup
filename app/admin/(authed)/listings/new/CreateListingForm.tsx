"use client";

import { useActionState, useRef, useEffect } from "react";
import { createListingAction, type ListingFormState } from "@/lib/actions/listings";
import PhotoDropzone from "@/components/PhotoDropzone";

const PHOTO_SLOTS = ["photo1", "photo2", "photo3", "photo4", "photo5", "photo6"];

export default function CreateListingForm() {
  const [state, formAction, pending] = useActionState<ListingFormState, FormData>(createListingAction, null);
  const formRef = useRef<HTMLFormElement>(null);
  const wasPending = useRef(false);

  useEffect(() => {
    // Reset the form after a successful (error-free) submit that just finished.
    if (wasPending.current && !pending && !state?.error) {
      formRef.current?.reset();
    }
    wasPending.current = pending;
  }, [pending, state]);

  return (
    <form ref={formRef} action={formAction} className="mob-stack" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24, alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <PhotoDropzone name="photo1" label="Drop main photo" aspectRatio="4/3" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>
          {PHOTO_SLOTS.slice(1).map((slot, i) => (
            <PhotoDropzone key={slot} name={slot} label={`Photo ${i + 2}`} aspectRatio="4/3" />
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="field">
          <label>Address</label>
          <input className="input" type="text" name="address" placeholder="123 Ocean Ave, Manhattan Beach" required />
        </div>
        <div className="mob-col-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
          <div className="field">
            <label>Rent</label>
            <input className="input" type="text" name="price" placeholder="$3,000/mo" required />
          </div>
          <div className="field">
            <label>Beds</label>
            <input className="input" type="number" name="beds" min={0} defaultValue={2} />
          </div>
          <div className="field">
            <label>Baths</label>
            <input className="input" type="number" name="baths" min={0} defaultValue={1} />
          </div>
          <div className="field">
            <label>Sq Ft</label>
            <input className="input" type="text" name="sqft" placeholder="1,100" />
          </div>
        </div>
        <div className="field">
          <label>Description</label>
          <textarea className="input" rows={3} name="description" placeholder="Tell prospects what makes this property stand out..." />
        </div>
        <div className="field">
          <label>Zillow Listing URL (optional)</label>
          <input className="input" type="url" name="zillowUrl" placeholder="https://www.zillow.com/homedetails/..." />
        </div>
        <div className="mob-col-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div className="field">
            <label>Pet Policy</label>
            <input className="input" type="text" name="petsPolicy" placeholder="e.g. Cats OK, no dogs" />
          </div>
          <div className="field">
            <label>Available Date</label>
            <input className="input" type="text" name="availableDate" placeholder="e.g. Sept 1, 2026" />
          </div>
          <div className="field">
            <label>Lease Term</label>
            <input className="input" type="text" name="leaseTerm" placeholder="e.g. 12 months" />
          </div>
          <div className="field">
            <label>Utilities Included</label>
            <input className="input" type="text" name="utilitiesIncluded" placeholder="e.g. Water, trash" />
          </div>
          <div className="field">
            <label>Furnished</label>
            <input className="input" type="text" name="furnished" placeholder="e.g. Unfurnished" />
          </div>
        </div>
        {state?.error && <p style={{ color: "#b64545", fontSize: 13, margin: 0 }}>{state.error}</p>}
        <button type="submit" className="btn btn-primary" style={{ padding: "12px 28px", alignSelf: "flex-start" }} disabled={pending}>
          {pending ? "Publishing…" : "Publish Listing"}
        </button>
      </div>
    </form>
  );
}
