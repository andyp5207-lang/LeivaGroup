import type { Metadata } from "next";
import CreateListingForm from "./CreateListingForm";

export const metadata: Metadata = { title: "Create Listing — Admin — Leiva Group" };

export default function CreateListingPage() {
  return (
    <div style={{ padding: 28, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-divider)", background: "var(--color-surface)", boxShadow: "var(--shadow-underglow)", marginBottom: 32 }}>
      <h4 style={{ marginBottom: 6 }}>Create Rental Listing</h4>
      <p className="text-muted" style={{ fontSize: 13, marginBottom: 18 }}>
        Add photos and fill in the details, then publish.
      </p>
      <CreateListingForm />
    </div>
  );
}
