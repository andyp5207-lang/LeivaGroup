import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/session";
import { logoutAction } from "@/lib/actions/auth";
import AdminTabs from "./AdminTabs";

export default async function AdminAuthedLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthed())) {
    redirect("/admin/login");
  }

  return (
    <div className="reveal" style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px 90px" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginBottom: 16 }}>
        <h1 style={{ fontSize: 44, margin: 0, textAlign: "center" }}>Admin</h1>
      </div>
      <AdminTabs />
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
        <form action={logoutAction}>
          <button
            type="submit"
            style={{ border: "none", background: "none", color: "var(--color-accent-700)", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0 }}
          >
            Log out
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
