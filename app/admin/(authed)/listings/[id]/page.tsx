import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRental } from "@/lib/rentals";
import EditListingForm from "./EditListingForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/admin/listings/[id]">): Promise<Metadata> {
  const { id } = await params;
  const rental = await getRental(id);
  return { title: rental ? `Edit ${rental.address} — Admin` : "Edit listing — Admin" };
}

export default async function EditListingPage({ params }: PageProps<"/admin/listings/[id]">) {
  const { id } = await params;
  const rental = await getRental(id);
  if (!rental) notFound();

  return (
    <div style={{ padding: 28, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-divider)", background: "var(--color-surface)", boxShadow: "var(--shadow-underglow)", marginBottom: 32 }}>
      <h4 style={{ marginBottom: 18 }}>Edit Listing</h4>
      <EditListingForm rental={rental} />
    </div>
  );
}
