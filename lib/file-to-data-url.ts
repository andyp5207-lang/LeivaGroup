import "server-only";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB per photo

/** Reads an uploaded File into a data: URL for inline storage. Returns null for empty/missing files. */
export async function fileToDataUrl(file: FormDataEntryValue | null): Promise<string | null> {
  if (!file || !(file instanceof File) || file.size === 0) return null;
  if (file.size > MAX_BYTES) {
    throw new Error(`${file.name || "Photo"} is larger than 8MB — please use a smaller image.`);
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const type = file.type || "image/jpeg";
  return `data:${type};base64,${buffer.toString("base64")}`;
}
