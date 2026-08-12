"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/lib/actions/auth";

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, null);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="field">
        <label htmlFor="username">Username</label>
        <input className="input" id="username" type="text" name="username" placeholder="Username" required />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input className="input" id="password" type="password" name="password" placeholder="Password" required />
      </div>
      {state?.error && <p role="alert" style={{ color: "#b64545", fontSize: 13, margin: 0 }}>{state.error}</p>}
      <button type="submit" className="btn btn-primary btn-block" style={{ padding: "14px 28px" }} disabled={pending}>
        {pending ? "Logging in…" : "Log In"}
      </button>
    </form>
  );
}
