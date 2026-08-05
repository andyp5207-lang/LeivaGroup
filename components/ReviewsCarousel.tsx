"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { REVIEWS, starsDisplay } from "@/lib/data";

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const review = REVIEWS[index];
  const initial = review.name.charAt(0).toUpperCase();

  return (
    <section className="reveal" style={{ borderTop: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", maxWidth: "64ch", margin: "0 auto 48px" }}>
          <h2 className="mob-shrink-h2" style={{ fontSize: 34, marginBottom: 12, whiteSpace: "nowrap" }}>
            We Love Happy Clients And It Shows
          </h2>
          <p style={{ opacity: 0.8, fontSize: 16, margin: 0 }}>
            Real reviews from South Bay owners and tenants who trust Leiva Group with their properties.
          </p>
        </div>

        <div
          className="mob-stack mob-shrink-reviews"
          style={{ display: "grid", gridTemplateColumns: "0.75fr 1.6fr", gap: 28, alignItems: "stretch" }}
        >
          <div
            className="card"
            style={{
              padding: "28px 24px",
              background: "var(--color-bg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 18,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginLeft: 34 }}>
              <Image src="/images/google-logo.png" alt="Google" width={140} height={52} style={{ height: 52, width: "auto", display: "block" }} />
              <div style={{ width: 1, alignSelf: "stretch", background: "var(--color-divider)" }} />
              <Image src="/images/yelp-logo-transparent.png" alt="Yelp" width={100} height={68} style={{ height: 68, width: "auto", display: "block" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 64, fontWeight: 600, color: "var(--color-accent-700)", lineHeight: 1 }}>
                4.5
              </div>
              <div style={{ fontSize: 26, letterSpacing: 4, color: "#d4a72c", marginTop: 8 }}>★★★★☆</div>
            </div>
            <div className="text-muted" style={{ fontSize: 14, textAlign: "center" }}>
              Based on 8 Yelp reviews
            </div>
          </div>

          <div
            className="card"
            style={{ padding: 36, background: "var(--color-bg)", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}
          >
            <div key={index} style={{ display: "flex", flexDirection: "column", gap: 24, animation: "reviewSwipe 0.5s ease-out both" }}>
              <p style={{ fontSize: 26, lineHeight: 1.45, margin: 0, fontWeight: 500 }}>&ldquo;{review.quote}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "var(--color-accent-700)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  {initial}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700, color: "var(--color-accent-700)", fontSize: 16 }}>{review.name}</span>
                    <span style={{ fontSize: 13, letterSpacing: 1, color: "var(--color-accent-2-600)" }}>{starsDisplay(review.stars)}</span>
                  </div>
                  <div className="text-muted" style={{ fontSize: 12 }}>
                    {review.city}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 28 }}>
          {REVIEWS.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show review ${i + 1}`}
              style={{
                width: i === index ? 10 : 8,
                height: i === index ? 10 : 8,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: i === index ? "var(--color-accent-700)" : "var(--color-divider)",
              }}
            />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link href="/reviews" className="btn btn-secondary">
            Read all reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
