import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthed } from "@/lib/session";

export const dynamic = "force-dynamic";

// One-time helper: visit this URL once while logged into /admin to create
// draft shells for a batch of properties (address/unit only, everything
// else left blank for the owner to fill in via Admin -> Current Listings).
// Safe to re-run — skips any address that already exists.
const SHELLS: { address: string; city: string; beds?: number }[] = [
  { address: "213 Calle Mirmar, Unit 4", city: "Redondo Beach, CA 90277" },
  { address: "213 Calle Mirmar, Unit 7", city: "Redondo Beach, CA 90277" },
  { address: "213 Calle Mirmar, Unit 9", city: "Redondo Beach, CA 90277" },
  { address: "Bluff Creek Dr, Unit 115", city: "South Bay, CA" },
  { address: "312 Bluff Creek Dr, Unit D3", city: "South Bay, CA", beds: 2 },
  { address: "319, Unit 4", city: "South Bay, CA", beds: 1 },
  { address: "8421 Kitty Hawk", city: "South Bay, CA" },
  { address: "405 Firmona, Unit 2", city: "South Bay, CA" },
  { address: "446 Monterey, Unit 62", city: "South Bay, CA" },
];

export async function GET() {
  if (!(await isAdminAuthed())) {
    return new NextResponse("Not authorized. Log into /admin first, then reload this page.", { status: 401 });
  }

  const created: string[] = [];
  const skipped: string[] = [];

  for (const shell of SHELLS) {
    const existing = await prisma.rental.findFirst({ where: { address: shell.address } });
    if (existing) {
      skipped.push(shell.address);
      continue;
    }
    await prisma.rental.create({
      data: {
        address: shell.address,
        city: shell.city,
        price: "",
        beds: shell.beds ?? 0,
        baths: 0,
        published: false,
      },
    });
    created.push(shell.address);
  }

  const body = [
    `Created ${created.length} draft listing(s):`,
    ...created.map((a) => `  + ${a}`),
    "",
    `Skipped ${skipped.length} (already existed):`,
    ...skipped.map((a) => `  - ${a}`),
    "",
    "Go to /admin/listings to fill in the details and publish each one.",
  ].join("\n");

  return new NextResponse(body, { headers: { "Content-Type": "text/plain" } });
}
