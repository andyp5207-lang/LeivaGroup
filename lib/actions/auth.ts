"use server";

import { timingSafeEqual } from "crypto";
import { redirect } from "next/navigation";
import { createAdminSession, destroyAdminSession } from "@/lib/session";

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export type LoginState = { error: string } | null;

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  const expectedUser = process.env.ADMIN_USERNAME || "";
  const expectedPass = process.env.ADMIN_PASSWORD || "";

  if (
    expectedUser &&
    expectedPass &&
    safeEqual(username, expectedUser) &&
    safeEqual(password, expectedPass)
  ) {
    await createAdminSession();
    redirect("/admin");
  }

  return { error: "Incorrect username or password." };
}

export async function logoutAction() {
  "use server";
  await destroyAdminSession();
  redirect("/admin/login");
}
