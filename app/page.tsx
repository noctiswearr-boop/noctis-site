"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  visible: boolean;
  description: string;
  image_url: string | null;
  category_name: string | null;
};

type Category = {
  id: string;
  name: string;
  visible: boolean;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tüm Ürünler");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function getData() {
      const { data: productData } = await supabase
        .from("products")
        .select("*")
        .eq("visible", true)
        .gt("stock", 0)
        .order("created_at", { ascending: false });

      const { data: categoryData } = await supabase
        .from("categories")
        .select("*")
        .eq("visible", true)
        .order("created_at", { ascending: true });

      setProducts(productData || []);
      setCategories(categoryData || []);
    }

    getData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Tüm Ürünler") return products;

    return products.filter(
      (product) => product.category_name === selectedCategory
    );
  }, [products, selectedCategory]);

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <nav className="fixed left-0 top-0 z-50 w-full px-8 py-6">
        <div className="mb-4 rounded-full border border-blue-300/20 bg-black/70 px-5 py-2 text-center text-xs uppercase tracking-[0.18em] text-blue-100 backdrop-blur">
          Üye ol, ilk siparişinde %10 indirim kazan.
        </div>

        <div className="flex items-center justify-between">
          <h1 className="font-serif text-2xl tracking-[0.45em]">NOCTIS</h1>

          <div className="hidden gap-8 text-sm font-semibold uppercase tracking-[0.22em] md:flex">
            <a href="#urunler" className="hover:text-blue-300">
              MAĞAZA
            </a>

            <Link href="/about" className="hover:text-blue-300">
              HAKKIMIZDA
            </Link>

            <Link href="/register" className="hover:text-blue-300">
              ÜYE OL
            </Link>

            <Link href="/login" className="hover:text-blue-300">
              GİRİŞ
            </Link>

            <Link href="/cart" className="hover:text-blue-300">
              SEPET
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-white/40 px-5 py-2 text-xs uppercase tracking-[0.25em] md:hidden"
          >
            MENÜ
          </button>
        </div>

        {menuOpen && (
          <div className="mt-5 rounded-3xl border border-white/10 bg-black/80 p-5 backdrop-blur md:hidden">
            <div className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-[0.25em]">
              <a
                href="#urunler"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-300"
              >
                MAĞAZA
              </a>

              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-300"
              >
                HAKKIMIZDA
              </Link>

              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-300"
              >
                ÜYE OL
              </Link>

              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-300"
              >
                GİRİŞ
              </Link>

              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-300"
              >
                SEPET
              </Link>
            </div>
          </div>
        )}
      </nav>

      <section className="relative flex min-h-screen items-center justify-center px-6 text-center">
        <Image
          src="/noctis-logo.png"
          alt="NOCTIS"
          fill
          priority
          className="object-cover opacity-70"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 mt-36 flex flex-col items-center">
          <p className="mb-5 text-xs uppercase tracking-[0.55em] text-blue-200">
            İlk Koleksiyon
          </p>

          <h2 className="font-serif text-6xl tracking-[0.45em] md:text-9xl">
            NOCTIS
          </h2>

          <p className="mt-6 max-w-xl text-base text-gray-200 md:text-lg">
            Karanlıktan doğdu. Geceyi benimseyenler için tasarlandı.
          </p>

          <div className="mt-10 flex flex-col gap-4 md:flex-row">
            <a
              href="#urunler"
              className="rounded-full border border-white/70 bg-black/30 px-8 py-4 text-sm font-semibold uppercase tracking-[0.35em] backdrop-blur transition hover:bg-white hover:text-black"
            >
              KOLEKSİYONU KEŞFET
            </a>

            <Link
              href="/register"
              className="rounded-full border border-blue-300/60 bg-blue-300/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-100 backdrop-blur transition hover:bg-blue-300 hover:text-black"
            >
              ÜYE OL %10 İNDİRİM AL
            </Link>
          </div>
        </div>
      </section>

      <section
        id="urunler"
        className="bg-gradient-to-b from-black via-[#061326] to-black px-8 py-28"
      >
        <p className="mb-4 text-center text-xs uppercase tracking-[0.45em] text-blue-200">
          Online Mağaza
        </p>

        <h3 className="mb-8 text-center font-serif text-3xl tracking-[0.35em]">
          ÜRÜNLER
        </h3>

        <div className="mx-auto mb-12 flex max-w-6xl flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory("Tüm Ürünler")}
            className={`rounded-full border px-5 py-2 text-sm uppercase tracking-[0.2em] transition ${
              selectedCategory === "Tüm Ürünler"
                ? "border-blue-300 bg-blue-300 text-black"
                : "border-white/30 hover:bg-white hover:text-black"
            }`}
          >
            Tüm Ürünler
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`rounded-full border px-5 py-2 text-sm uppercase tracking-[0.2em] transition ${
                selectedCategory === category.name
                  ? "border-blue-300 bg-blue-300 text-black"
                  : "border-white/30 hover:bg-white hover:text-black"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {filteredProducts.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-2 hover:border-blue-300/40 hover:bg-white/[0.07]"
            >
              <div className="mb-6 flex h-72 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#020817] via-[#0B1D3A] to-black">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <span className="font-serif text-6xl text-white/20">N</span>
                )}
              </div>

              <p className="text-sm uppercase text-blue-200">
                {product.category_name || "NOCTIS"}
              </p>

              <h4 className="mt-2 text-xl font-semibold">{product.name}</h4>

              <p className="mt-2 text-gray-400">{product.description}</p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl">{product.price} TL</span>

                <span className="rounded-full border border-white/40 px-4 py-2 text-xs uppercase">
                  İncele
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="mt-10 text-center text-gray-400">
            Bu kategoride yayında ürün yok.
          </p>
        )}
      </section>
    </main>
  );
}