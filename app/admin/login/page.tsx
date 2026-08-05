import type { Metadata } from "next";
import AdminLoginForm from "./AdminLoginForm";

export const metadata: Metadata = { title: "Admin Log In — Leiva Group" };

export default function AdminLoginPage() {
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px 90px" }}>
      <h1 style={{ fontSize: 44, marginBottom: 16, textAlign: "center" }}>Admin</h1>
      <p style={{ maxWidth: "60ch", opacity: 0.85, marginBottom: 32, fontSize: 17, textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
        Please log in to manage rentals and view appointments.
      </p>
      <div style={{ maxWidth: 420, margin: "0 auto", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-divider)", background: "var(--color-surface)", boxShadow: "var(--shadow-underglow)" }}>
        <AdminLoginForm />
      </div>
    </div>
  );
}
