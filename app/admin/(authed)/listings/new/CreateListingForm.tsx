"use client";

import { useActionState, useRef, useState, useEffect, startTransition } from "react";
import { createListingAction, type ListingFormState } from "@/lib/actions/listings";
import PhotoPicker, { type PhotoItem } from "@/components/PhotoPicker";

export default function CreateListingForm() {
  const [state, formAction, pending] = useActionState<ListingFormState, FormData>(createListingAction, null);
  const formRef = useRef<HTMLFormElement>(null);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const wasPending = useRef(false);

  useEffect(() => {
    // Reset the form after a successful (error-free) submit that just finished.
    if (wasPending.current && !pending && !state?.error) {
      formRef.current?.reset();
      setPhotos([]);
    }
    wasPending.current = pending;
  }, [pending, state]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    for (const p of photos) {
      if (p.file) fd.append("newPhotos", p.file);
    }
    startTransition(() => {
      formAction(fd);
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mob-stack"
      style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24, alignItems: "start" }}
    >
      <PhotoPicker items={photos} onChange={setPhotos} />

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="field">
          <label>Address</label>
          <input className="input" type="text" name="address" placeholder="123 Ocean Ave, Manhattan Beach" required />
        </div>
        <div className="mob-col-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div className="field">
            <label>City</label>
            <input className="input" type="text" name="city" placeholder="Manhattan Beach, CA" />
          </div>
          <div className="field">
            <label>Zip Code</label>
            <input className="input" type="text" name="zip" placeholder="90266" />
          </div>
        </div>
        <div className="mob-col-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
          <div className="field">
            <label>Rent</label>
            <input className="input" type="text" name="price" placeholder="$3,000/mo" required />
          </div>
          <div className="field">
            <label>Beds</label>
            <select className="input" name="beds" defaultValue={2}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Baths</label>
            <select className="input" name="baths" defaultValue={1}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
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
