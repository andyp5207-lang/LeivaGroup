import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Leiva Group",
  description: "A message from Leiva Group's founder, Reyna Leiva.",
};

export default function AboutPage() {
  return (
    <div className="reveal" style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px 90px" }}>
      <h1 style={{ fontSize: 44, maxWidth: "20ch", marginBottom: 56 }}>About Leiva Group</h1>

      <div
        className="mob-stack"
        style={{
          padding: 36,
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-divider)",
          background: "var(--color-surface)",
          boxShadow: "var(--shadow-underglow)",
          marginBottom: 64,
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 28,
          alignItems: "start",
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            background: "var(--color-accent-700)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: 28,
            flexShrink: 0,
          }}
        >
          RL
        </div>
        <div>
          <h3 style={{ fontSize: 22, marginBottom: 10 }}>A message from our founder</h3>
          <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.9, margin: "0 0 12px" }}>
            &ldquo;We&rsquo;re dedicated to hands-on, personal service — for the owners who trust us with their
            investment, and for the renters who call it home. Every property is treated like our own, with the care,
            responsiveness, and honesty both deserve.&rdquo;
          </p>
          <p style={{ fontWeight: 700, margin: 0 }}>Reyna Leiva</p>
          <p className="text-muted" style={{ fontSize: 14, margin: 0 }}>
            Founder of Leiva Group
          </p>
        </div>
      </div>
    </div>
  );
}
