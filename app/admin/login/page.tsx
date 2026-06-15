"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Kontrol ediliyor...");

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = "/admin";
    } else {
      setMessage("Şifre yanlış.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-[#061326] to-black p-8 text-white">
      <form
        onSubmit={login}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8"
      >
        <h1 className="font-serif text-4xl tracking-[0.25em]">NOCTIS</h1>

        <p className="mt-4 text-gray-400">Admin paneline giriş yap.</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin şifresi"
          className="mt-8 w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
          required
        />

        <button className="mt-6 w-full rounded-full border border-white/70 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] hover:bg-white hover:text-black">
          Giriş Yap
        </button>

        {message && <p className="mt-5 text-blue-200">{message}</p>}
      </form>
    </main>
  );
}