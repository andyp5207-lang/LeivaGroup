import type { Metadata } from "next";
import { REVIEWS, starsDisplay } from "@/lib/data";

export const metadata: Metadata = {
  title: "Reviews — Leiva Group",
  description: "Real client reviews from Leiva Group's Yelp listing (4.5 stars, 8 reviews).",
};

export default function ReviewsPage() {
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px 90px" }}>
      <h1 style={{ fontSize: 44, marginBottom: 16 }}>Owners on Yelp &amp; Google.</h1>
      <p style={{ maxWidth: "60ch", opacity: 0.85, marginBottom: 8, fontSize: 17 }}>
        Real client reviews, excerpted from our{" "}
        <a href="https://www.yelp.com/biz/leiva-group-real-estate-lawndale-3" target="_blank" rel="noopener">
          Yelp listing
        </a>{" "}
        (4.5 stars, 8 reviews).
      </p>
      <div className="mob-col-1" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28, marginTop: 40 }}>
        {REVIEWS.map((r) => (
          <div key={r.name} className="card" style={{ padding: 24 }}>
            <div className="card-title" style={{ fontSize: 19 }}>
              {r.name}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
              <span style={{ fontSize: 19, letterSpacing: 3, color: "var(--color-accent-2-600)" }}>{starsDisplay(r.stars)}</span>
              <span className="text-muted" style={{ fontSize: 12 }}>
                {r.source}
              </span>
            </div>
            <p className="card-body" style={{ marginTop: 6 }}>
              &ldquo;{r.quote}&rdquo;
            </p>
            <div className="card-meta">{r.city}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40, display: "flex", gap: 14 }}>
        <a href="https://www.yelp.com/biz/leiva-group-real-estate-lawndale-3" target="_blank" rel="noopener" className="btn btn-secondary">
          View on Yelp
        </a>
        <a href="#" className="btn btn-secondary">
          View on Google
        </a>
      </div>
    </div>
  );
}
