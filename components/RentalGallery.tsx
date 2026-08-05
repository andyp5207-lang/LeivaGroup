"use client";

import { useState } from "react";
import Image from "next/image";

function PlaceholderArt() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, var(--color-accent-100), var(--color-accent-200))",
      }}
    >
      <svg viewBox="0 0 100 100" width="40%" style={{ opacity: 0.55 }}>
        <polygon points="50,22 84,48 78,48 78,80 22,80 22,48 16,48" fill="none" stroke="var(--color-accent-600)" strokeWidth={2.2} strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function RentalGallery({ photos, address }: { photos: string[]; address: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const count = photos.length || 1;

  function open(i: number) {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }

  return (
    <>
      <div
        style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", aspectRatio: "16/10", border: "1px solid var(--color-divider)", marginBottom: 12, cursor: "pointer", position: "relative" }}
        onClick={() => open(0)}
      >
        {photos[0] ? <Image src={photos[0]} alt={address} fill style={{ objectFit: "cover" }} unoptimized /> : <PlaceholderArt />}
      </div>
      {photos.length > 1 && (
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8, marginBottom: 24 }}>
          {photos.slice(1).map((url, i) => (
            <div
              key={i}
              onClick={() => open(i + 1)}
              style={{ flex: "0 0 140px", borderRadius: "var(--radius-md)", overflow: "hidden", aspectRatio: "4/3", border: "1px solid var(--color-divider)", cursor: "pointer", position: "relative" }}
            >
              <Image src={url} alt={`${address} photo ${i + 2}`} fill style={{ objectFit: "cover" }} unoptimized />
            </div>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(10,14,18,0.94)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            style={{ position: "absolute", top: 24, right: 28, background: "none", border: "none", color: "#fff", fontSize: 32, cursor: "pointer", lineHeight: 1 }}
          >
            ×
          </button>
          <div style={{ position: "relative", width: "min(88vw,1100px)", height: "min(80vh,750px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button
              type="button"
              onClick={() => setLightboxIndex((i) => (i - 1 + count) % count)}
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: 44, height: 44, borderRadius: "50%", fontSize: 20, cursor: "pointer", zIndex: 1 }}
            >
              ←
            </button>
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              {photos[lightboxIndex] ? (
                <Image src={photos[lightboxIndex]} alt={address} fill style={{ objectFit: "contain" }} unoptimized />
              ) : (
                <PlaceholderArt />
              )}
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex((i) => (i + 1) % count)}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: 44, height: 44, borderRadius: "50%", fontSize: 20, cursor: "pointer", zIndex: 1 }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
