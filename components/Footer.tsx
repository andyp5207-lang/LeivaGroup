import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

const HOURS = [
  ["Monday", "9 AM–4 PM"],
  ["Tuesday", "9 AM–4 PM"],
  ["Wednesday", "9 AM–4 PM"],
  ["Thursday", "9 AM–4 PM"],
  ["Friday", "9 AM–4 PM"],
  ["Saturday", "Closed"],
  ["Sunday", "Closed"],
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--color-divider)", background: "var(--color-accent-500)" }}>
      <div
        className="mob-stack"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "48px 24px 32px",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr",
          gap: 36,
        }}
      >
        <div>
          <Image
            src="/images/leiva-group-logo.png"
            alt="Leiva Group"
            width={600}
            height={200}
            style={{ height: 200, width: "auto", display: "block", margin: "-40px 0 -30px -10px", maxWidth: "none" }}
          />
          <p style={{ fontSize: 13, margin: 0, color: "#fff", opacity: 0.85 }}>
            © {new Date().getFullYear()} Leiva Group Property Management · Manhattan Beach &amp; Torrance, CA
          </p>
        </div>
        <div>
          <h5 style={{ marginBottom: 12, color: "#fff" }}>Contact</h5>
          <p style={{ margin: "0 0 6px", fontSize: 14, color: "#fff" }}>
            4646 Manhattan Beach Blvd, Ste A
            <br />
            Lawndale, CA 90260
          </p>
          <p style={{ margin: 0, fontSize: 14 }}>
            <a href="tel:+13106832601" style={{ color: "#fff" }}>
              (310) 683-2601
            </a>
          </p>
          <p style={{ margin: "10px 0 0", fontSize: 14 }}>
            <Link href="/admin" style={{ color: "#fff", textDecoration: "underline" }}>
              Admin
            </Link>
          </p>
        </div>
        <div>
          <h5 style={{ marginBottom: 12, color: "#fff" }}>Hours</h5>
          <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: "4px 16px", fontSize: 13, color: "#fff" }}>
            {HOURS.map(([day, hrs]) => (
              <Fragment key={day}>
                <span style={{ opacity: 0.8 }}>{day}</span>
                <span>{hrs}</span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
