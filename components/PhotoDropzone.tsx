"use client";

import { useRef, useState, type DragEvent } from "react";
import Image from "next/image";

export default function PhotoDropzone({
  name,
  label,
  initialUrl,
  aspectRatio = "4/3",
}: {
  name: string;
  label: string;
  initialUrl?: string | null;
  aspectRatio?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const [dragOver, setDragOver] = useState(false);

  function showFile(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && inputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      inputRef.current.files = dt.files;
      showFile(file);
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      style={{
        position: "relative",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        aspectRatio,
        border: dragOver ? "2px dashed var(--color-accent-700)" : "1px solid var(--color-divider)",
        cursor: "pointer",
        background: "var(--color-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {preview ? (
        <Image src={preview} alt={label} fill style={{ objectFit: "cover" }} unoptimized />
      ) : (
        <span className="text-muted" style={{ fontSize: 12, textAlign: "center", padding: 8 }}>
          {label}
        </span>
      )}
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        onChange={(e) => showFile(e.target.files?.[0])}
        style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
      />
    </div>
  );
}
