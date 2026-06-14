"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { uploadImage } from "../../../lib/uploadImage";

type Category = {
  id: string;
  name: string;
  visible: boolean;
};

export default function AddProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getCategories() {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .eq("visible", true)
        .order("created_at", { ascending: true });

      setCategories(data || []);

      if (data && data.length > 0) {
        setCategoryName(data[0].name);
      }
    }

    getCategories();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Ürün ekleniyor...");

    try {
      let imageUrl = "";

      if (file) {
        imageUrl = await uploadImage(file);
      }

      const { error } = await supabase.from("products").insert({
        name,
        category_id: null,
        category_name: categoryName || "Tişört",
        price: Number(price),
        stock: Number(stock),
        visible,
        description,
        image_url: imageUrl,
      });

      if (error) throw error;

      setMessage("Ürün başarıyla eklendi.");

      setName("");
      setPrice("");
      setStock("");
      setDescription("");
      setVisible(true);
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage("Ürün eklenirken hata oluştu.");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#061326] to-black p-8 text-white">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-serif text-4xl tracking-[0.25em]">ÜRÜN EKLE</h1>

        <Link
          href="/admin"
          className="rounded-full border border-white/40 px-5 py-2 text-sm hover:bg-white hover:text-black"
        >
          Admin Panele Dön
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-8"
      >
        <div className="grid gap-6">
          <div>
            <label className="mb-2 block text-sm text-gray-300">Ürün Adı</label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn: Eclipse Tee"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Kategori</label>
            <select
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            >
              {categories.length === 0 ? (
                <option value="Tişört">Tişört</option>
              ) : (
                categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-gray-300">Fiyat</label>
              <input
                type="number"
                className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="799"
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
                placeholder="10"
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
              placeholder="Ürün açıklamasını yaz..."
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Ürün Fotoğrafı
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
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
            Ürünü Kaydet
          </button>

          {message && <p className="text-blue-200">{message}</p>}
        </div>
      </form>
    </main>
  );
}