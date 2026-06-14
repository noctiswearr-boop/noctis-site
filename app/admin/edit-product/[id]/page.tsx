"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabase";

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setMessage("Ürün bulunamadı.");
        return;
      }

      setName(data.name || "");
      setPrice(String(data.price || ""));
      setStock(String(data.stock || ""));
      setDescription(data.description || "");
      setVisible(Boolean(data.visible));
    }

    getProduct();
  }, [id]);

  async function updateProduct(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Ürün güncelleniyor...");

    const { error } = await supabase
      .from("products")
      .update({
        name,
        price: Number(price),
        stock: Number(stock),
        description,
        visible,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      setMessage("Ürün güncellenirken hata oluştu.");
      return;
    }

    setMessage("Ürün başarıyla güncellendi.");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#061326] to-black p-8 text-white">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-serif text-4xl tracking-[0.25em]">
          ÜRÜN DÜZENLE
        </h1>

        <Link
          href="/admin"
          className="rounded-full border border-white/40 px-5 py-2 text-sm hover:bg-white hover:text-black"
        >
          Admin Panele Dön
        </Link>
      </div>

      <form
        onSubmit={updateProduct}
        className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-8"
      >
        <div className="grid gap-6">
          <div>
            <label className="mb-2 block text-sm text-gray-300">Ürün Adı</label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-gray-300">Fiyat</label>
              <input
                type="number"
                className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Stok</label>
              <input
                type="number"
                className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Açıklama</label>
            <textarea
              className="min-h-32 w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={visible}
              onChange={(e) => setVisible(e.target.checked)}
            />
            Ürün yayında görünsün
          </label>

          <button className="rounded-full border border-white/70 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] transition hover:bg-white hover:text-black">
            Ürünü Güncelle
          </button>

          {message && <p className="text-blue-200">{message}</p>}
        </div>
      </form>
    </main>
  );
}