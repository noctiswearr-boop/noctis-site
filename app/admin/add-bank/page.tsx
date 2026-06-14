"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AddBankPage() {
  const [bankName, setBankName] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [iban, setIban] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [message, setMessage] = useState("");

  async function addBank(e: React.FormEvent) {
    e.preventDefault();
    setMessage("IBAN ekleniyor...");

    if (isDefault) {
      await supabase
        .from("bank_accounts")
        .update({ is_default: false })
        .neq("id", "00000000-0000-0000-0000-000000000000");
    }

    const { error } = await supabase.from("bank_accounts").insert({
      bank_name: bankName,
      account_holder: accountHolder,
      iban,
      is_default: isDefault,
    });

    if (error) {
      console.error(error);
      setMessage("IBAN eklenirken hata oluştu.");
      return;
    }

    setMessage("IBAN başarıyla eklendi.");

    setBankName("");
    setAccountHolder("");
    setIban("");
    setIsDefault(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#061326] to-black p-8 text-white">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-serif text-4xl tracking-[0.25em]">
          IBAN EKLE
        </h1>

        <Link
          href="/admin"
          className="rounded-full border border-white/40 px-5 py-2 text-sm hover:bg-white hover:text-black"
        >
          Admin Panele Dön
        </Link>
      </div>

      <form
        onSubmit={addBank}
        className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-8"
      >
        <div className="grid gap-6">
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Banka Adı
            </label>
            <input
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Örn: Ziraat Bankası"
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Alıcı Adı
            </label>
            <input
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="Örn: Ad Soyad"
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">IBAN</label>
            <input
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              placeholder="TR00 0000 0000 0000 0000 0000 00"
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
              required
            />
          </div>

          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
            />
            Varsayılan ödeme hesabı yap
          </label>

          <button className="rounded-full border border-white/70 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] transition hover:bg-white hover:text-black">
            IBAN Kaydet
          </button>

          {message && <p className="text-blue-200">{message}</p>}
        </div>
      </form>
    </main>
  );
}