"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/lib/actions/auth";

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, null);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="field">
        <label>Username</label>
        <input className="input" type="text" name="username" placeholder="Username" required />
      </div>
      <div className="field">
        <label>Password</label>
        <input className="input" type="password" name="password" placeholder="Password" required />
      </div>
      {state?.error && <p style={{ color: "#b64545", fontSize: 13, margin: 0 }}>{state.error}</p>}
      <button type="submit" className="btn btn-primary btn-block" style={{ padding: "14px 28px" }} disabled={pending}>
        {pending ? "Logging in…" : "Log In"}
      </button>
    </form>
  );
}
