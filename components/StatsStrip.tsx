"use client";

import { useEffect, useRef, useState } from "react";
import { BuildingIcon, StarIcon, PinIcon, BoltIcon } from "@/components/icons";

const STATS = [
  { Icon: BuildingIcon, label: "Units under management", target: 250, suffix: "+", decimals: 0 },
  { Icon: StarIcon, label: "Average review rating", target: 4.9, suffix: "", decimals: 1 },
  { Icon: PinIcon, label: "Serving the South Bay", target: 20, suffix: " yrs", decimals: 0 },
];

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const started = useRef(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1200;
            const start = performance.now();
            const step = (now: number) => {
              const raw = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - raw, 3);
              setT(eased);
              if (raw < 1) raf.current = requestAnimationFrame(step);
            };
            raf.current = requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <section className="reveal" style={{ borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
      <div
        ref={ref}
        className="mob-col-2"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "32px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 24,
          textAlign: "center",
        }}
      >
        {STATS.map((s) => (
          <div key={s.label}>
            <div style={{ color: "var(--color-accent-700)", marginBottom: 4, display: "flex", justifyContent: "center" }}>
              <s.Icon width={24} height={24} />
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 32, fontWeight: 600 }}>
              {(s.target * t).toFixed(s.decimals)}
              {s.suffix}
            </div>
            <div className="text-muted" style={{ fontSize: 13 }}>
              {s.label}
            </div>
          </div>
        ))}
        <div>
          <div style={{ color: "var(--color-accent-700)", marginBottom: 4, display: "flex", justifyContent: "center" }}>
            <BoltIcon width={24} height={24} />
          </div>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 32, fontWeight: 600 }}>24/7</div>
          <div className="text-muted" style={{ fontSize: 13 }}>
            Emergency response
          </div>
        </div>
      </div>
    </section>
  );
}
