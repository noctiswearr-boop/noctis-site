"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Giriş yapılıyor...");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      setMessage("E-posta veya şifre hatalı.");
      return;
    }

    setMessage("Giriş başarılı. Sepete yönlendiriliyorsunuz...");
    window.location.href = "/cart";
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#061326] to-black px-8 py-10 text-white">
      <Link href="/" className="text-sm tracking-[0.25em] text-blue-200">
        ← ANA SAYFA
      </Link>

      <section className="mx-auto max-w-xl py-20">
        <p className="mb-4 text-xs uppercase tracking-[0.45em] text-blue-200">
          NOCTIS ÜYELİK
        </p>

        <h1 className="font-serif text-5xl tracking-[0.25em]">
          GİRİŞ YAP
        </h1>

        <p className="mt-5 text-gray-300">
          Üye hesabınızla giriş yaparak %10 indirimden yararlanabilirsiniz.
        </p>

        <form
          onSubmit={login}
          className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8"
        >
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta"
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifre"
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
              required
            />
          </div>

          <button className="mt-8 w-full rounded-full border border-white/70 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] hover:bg-white hover:text-black">
            Giriş Yap
          </button>

          {message && <p className="mt-5 text-blue-200">{message}</p>}

          <p className="mt-6 text-sm text-gray-400">
            Henüz hesabınız yok mu?{" "}
            <Link href="/register" className="text-blue-200 hover:text-white">
              Üye ol
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}