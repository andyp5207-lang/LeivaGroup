"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/rentals", label: "Rentals" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="mob-tight-pad"
      style={{
        background: "var(--color-accent-500)",
        width: "100%",
        padding: 0,
        minHeight: 64,
        overflow: "visible",
        position: "sticky",
        top: 0,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="mob-tight-pad"
        style={{
          maxWidth: 1180,
          width: "100%",
          height: 64,
          flexShrink: 0,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", overflow: "visible" }}>
          <Image
            src="/images/leiva-group-logo.png"
            alt="Leiva Group"
            width={330}
            height={110}
            priority
            className="mob-shrink-logo"
            style={{ height: 110, width: "auto", display: "block" }}
          />
        </Link>

        <nav
          className="mob-hide nav-links-shrink"
          style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 17, fontWeight: 700 }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              style={{ color: "#fff" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="tel:+13106832601"
          className="btn btn-white mob-call-compact"
          style={{ textDecoration: "none", marginLeft: 32, padding: "12px 20px", whiteSpace: "nowrap" }}
        >
          Call (310) 683-2601
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="mob-menu-btn"
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(255,255,255,0.4)",
            background: "none",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      </div>

      {open && (
        <nav
          className="mob-hamburger-links"
          style={{ display: "flex", flexDirection: "column", background: "var(--color-accent-500)", padding: 0 }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                color: "#fff",
                padding: "14px 24px",
                fontSize: 17,
                fontWeight: 700,
                borderBottom: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
