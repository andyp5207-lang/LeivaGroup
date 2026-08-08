import Image from "next/image";
import Link from "next/link";
import StatsStrip from "@/components/StatsStrip";
import ServicesGrid from "@/components/ServicesGrid";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import BookingCalendar from "@/components/BookingCalendar";
import { SERVICE_AREAS } from "@/lib/data";

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: 560, display: "flex", alignItems: "center", overflow: "hidden" }}>
        <Image
          src="/images/hero-photo.webp"
          alt="Manhattan Beach / Torrance property"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(15,31,45,0.55)", pointerEvents: "none" }} />
        <div
          style={{
            position: "relative",
            maxWidth: 1180,
            margin: "0 auto",
            padding: "60px 24px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1
            className="mob-shrink-hero"
            style={{
              fontFamily: "var(--font-script)",
              fontSize: 88,
              fontWeight: 400,
              lineHeight: 1,
              marginBottom: 16,
              whiteSpace: "nowrap",
              background: "linear-gradient(135deg, #ffffff, var(--color-accent-200))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 4px 18px rgba(0,0,0,0.45)) drop-shadow(0 0 30px rgba(255,255,255,0.35))",
            }}
          >
            Leave it to Leiva!
          </h1>
          <p
            className="mob-shrink-tagline"
            style={{
              fontSize: 15,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: 0.95,
              marginBottom: 32,
              color: "#fff",
              whiteSpace: "nowrap",
              textShadow: "0 2px 10px rgba(0,0,0,0.5), 0 0 16px rgba(255,255,255,0.3)",
            }}
          >
            Proudly serving the South Bay and Orange County
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
            <a
              href="#home-contact"
              className="btn"
              style={{
                padding: "14px 28px",
                background: "#fff",
                color: "var(--color-accent-800)",
                borderColor: "#fff",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.6), 0 10px 30px -6px rgba(0,0,0,0.5), 0 0 24px rgba(255,255,255,0.35)",
              }}
            >
              Get a Free Quote →
            </a>
            <Link
              href="/rentals"
              className="btn"
              style={{
                padding: "14px 28px",
                background: "#fff",
                color: "var(--color-accent-800)",
                borderColor: "#fff",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.6), 0 10px 30px -6px rgba(0,0,0,0.5), 0 0 24px rgba(255,255,255,0.35)",
              }}
            >
              View Available Rentals
            </Link>
          </div>
        </div>
      </section>

      <StatsStrip />

      {/* FEATURES */}
      <section className="reveal" style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 24px 40px" }}>
        <div style={{ marginBottom: 40, display: "flex", alignItems: "center", gap: 14 }}>
          <span
            className="mob-shrink-badge mob-hide-badge"
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "var(--color-accent-700)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            ⚙
          </span>
          <h2 className="mob-shrink-h2" style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.01em", whiteSpace: "nowrap", margin: 0 }}>
            Everything an owner needs, <span style={{ color: "var(--color-accent-700)" }}>one point of contact.</span>
          </h2>
        </div>
        <ServicesGrid variant="home" />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
          <Link href="/services" className="btn btn-primary" style={{ padding: "10px 20px", fontSize: 13, borderRadius: 999 }}>
            View All Services →
          </Link>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="reveal" style={{ width: "100%", background: "#fff", padding: 0 }}>
        <div
          className="mob-shrink-about"
          style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "320px 1fr auto", gap: 48, alignItems: "stretch" }}
        >
          <div style={{ alignSelf: "stretch", margin: "24px 0 24px -24px", borderRadius: "var(--radius-lg)", overflow: "hidden", position: "relative" }}>
            <Image src="/images/hero-photo.webp" alt="Leiva Group" fill style={{ objectFit: "cover" }} />
          </div>
          <div style={{ padding: "90px 0", alignSelf: "center" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 30, fontWeight: 600, marginBottom: 8 }}>Our Story</h3>
            <p className="text-muted" style={{ margin: 0, maxWidth: "60ch", fontWeight: 600 }}>
              Nearly two decades managing South Bay properties with a hands-on, local team — meet the people behind Leiva
              Group and hear a message from our founder.
            </p>
          </div>
          <Link
            href="/about"
            className="btn btn-primary"
            style={{ padding: "10px 20px", fontSize: 13, borderRadius: 999, whiteSpace: "nowrap", marginRight: 28, alignSelf: "end", marginBottom: 24 }}
          >
            View More →
          </Link>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="reveal" style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 24px 80px" }}>
        <div
          className="mob-stack"
          style={{
            padding: 36,
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: 36,
            alignItems: "center",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-divider)",
            background: "var(--color-surface)",
            boxShadow: "var(--shadow-underglow)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "var(--color-accent-700)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 15,
                  flexShrink: 0,
                }}
              >
                ☉
              </span>
              <h3 style={{ fontSize: 24, margin: 0 }}>Local to the South Bay.</h3>
            </div>
            <p className="text-muted" style={{ margin: "0 0 16px", maxWidth: "50ch" }}>
              We proudly serve properties in the South Bay only — close enough to personally inspect every one we manage.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {SERVICE_AREAS.map((area) => (
                <span key={area} className="tag tag-accent">
                  {area}
                </span>
              ))}
            </div>
          </div>
          <div
            style={{
              position: "relative",
              height: 320,
              overflow: "hidden",
              background: "var(--color-bg)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-divider)",
              boxShadow: "var(--shadow-underglow)",
            }}
          >
            <ServiceAreaMap />
          </div>
        </div>
      </section>

      <ReviewsCarousel />

      {/* SPACER */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 24px" }}>
        <div style={{ height: 20, background: "var(--color-bg)" }} />
      </section>

      {/* CONTACT */}
      <section id="home-contact" className="reveal" style={{ borderTop: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 24px" }}>
          <h2 style={{ fontSize: 34, marginBottom: 16 }}>Schedule a time to talk.</h2>
          <p style={{ maxWidth: "60ch", opacity: 0.85, marginBottom: 40, fontSize: 17 }}>
            Pick an open date, choose a time, and we&rsquo;ll confirm your appointment — completely free, no obligation.
          </p>
          <BookingCalendar variant="home" />
        </div>
      </section>
    </div>
  );
}
