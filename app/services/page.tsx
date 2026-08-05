import type { Metadata } from "next";
import Link from "next/link";
import ServicesGrid from "@/components/ServicesGrid";

export const metadata: Metadata = {
  title: "Services — Leiva Group",
  description: "Full-service property management for South Bay owners: tenant screening, rent collection, maintenance, inspections, 24/7 support, and marketing.",
};

export default function ServicesPage() {
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px 90px" }}>
      <h1 className="mob-shrink-h2" style={{ fontSize: 32, whiteSpace: "nowrap", marginBottom: 16 }}>
        Full-service management for South Bay owners only.
      </h1>
      <p style={{ maxWidth: "60ch", opacity: 0.85, marginBottom: 48, fontSize: 17 }}>
        Single-family homes, multi-unit buildings and HOAs — one team handles leasing, rent, maintenance and compliance.
      </p>
      <ServicesGrid variant="services" />
      <div style={{ marginTop: 56, textAlign: "center" }}>
        <Link href="/#home-contact" className="btn btn-primary" style={{ padding: "14px 28px" }}>
          Request a Proposal
        </Link>
      </div>
    </div>
  );
}
