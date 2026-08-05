"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin/listings/new", label: "Create Listing" },
  { href: "/admin/listings", label: "Current Listings" },
  { href: "/admin/appointments", label: "Appointments" },
];

export default function AdminTabs() {
  const pathname = usePathname();

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 24, borderBottom: "1px solid var(--color-divider)", flexWrap: "wrap", justifyContent: "center" }}>
      {TABS.map((tab) => {
        const active = pathname === tab.href || (tab.href === "/admin/listings" && pathname?.startsWith("/admin/listings/") && !pathname.endsWith("/new"));
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              padding: "8px 4px 12px",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--color-text)",
              borderBottom: active ? "2px solid var(--color-accent-700)" : "2px solid transparent",
            }}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
