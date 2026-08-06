"use client";

import { useRef } from "react";
import Image from "next/image";

export type PhotoItem = {
  key: string;
  url: string; // preview URL (existing photo URL, or an object URL for a newly picked file)
  file?: File; // present only for newly picked photos not yet saved
  existingId?: string; // present only for photos that already exist in the database
};

export default function PhotoPicker({
  items,
  onChange,
}: {
  items: PhotoItem[];
  onChange: (items: PhotoItem[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const added: PhotoItem[] = Array.from(fileList).map((file) => ({
      key: `new-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      url: URL.createObjectURL(file),
      file,
    }));
    onChange([...items, ...added]);
  }

  function remove(key: string) {
    onChange(items.filter((p) => p.key !== key));
  }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 10 }}>
        {items.map((p, i) => (
          <div
            key={p.key}
            style={{
              position: "relative",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              aspectRatio: "4/3",
              border: "1px solid var(--color-divider)",
              background: "var(--color-bg)",
            }}
          >
            <Image src={p.url} alt={`Photo ${i + 1}`} fill style={{ objectFit: "cover" }} unoptimized />
            {i === 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 4,
                  left: 4,
                  background: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                Main
              </span>
            )}
            <button
              type="button"
              onClick={() => remove(p.key)}
              aria-label="Remove photo"
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                width: 22,
                height: 22,
                borderRadius: "50%",
                border: "none",
                background: "rgba(0,0,0,0.65)",
                color: "#fff",
                cursor: "pointer",
                fontSize: 14,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          style={{
            aspectRatio: "4/3",
            borderRadius: "var(--radius-md)",
            border: "2px dashed var(--color-divider)",
            background: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            color: "var(--color-accent-700)",
            fontFamily: "var(--font-body)",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <span style={{ fontSize: 22, lineHeight: 1 }}>+</span>
          Add photos
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = ""; // allow picking the same file again later
        }}
        style={{ display: "none" }}
      />
      {items.length > 0 && (
        <p className="text-muted" style={{ fontSize: 12, marginTop: 8 }}>
          The first photo is used as the main photo. Drag isn&rsquo;t supported yet — remove and re-add in a different order to reorder.
        </p>
      )}
    </div>
  );
}
