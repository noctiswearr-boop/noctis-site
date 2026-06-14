"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AddCategoryPage() {
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState("");

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Kategori ekleniyor...");

    const { error } = await supabase.from("categories").insert({
      name,
      visible,
    });

    if (error) {
      console.error(error);
      setMessage("Kategori eklenirken hata oluştu.");
      return;
    }

    setName("");
    setVisible(true);
    setMessage("Kategori başarıyla eklendi.");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#061326] to-black p-8 text-white">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-serif text-4xl tracking-[0.25em]">
          KATEGORİ EKLE
        </h1>

        <Link
          href="/admin"
          className="rounded-full border border-white/40 px-5 py-2 text-sm hover:bg-white hover:text-black"
        >
          Admin Panele Dön
        </Link>
      </div>

      <form
        onSubmit={addCategory}
        className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-8"
      >
        <div className="grid gap-6">
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Kategori Adı
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn: Tişört"
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
              required
            />
          </div>

          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={visible}
              onChange={(e) => setVisible(e.target.checked)}
            />
            Kategori müşteriye görünsün
          </label>

          <button className="rounded-full border border-white/70 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] transition hover:bg-white hover:text-black">
            Kategoriyi Kaydet
          </button>

          {message && <p className="text-blue-200">{message}</p>}
        </div>
      </form>
    </main>
  );
}