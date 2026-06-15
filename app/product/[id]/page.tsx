"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string | null;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  size: string;
  quantity: number;
};

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState("M");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getProduct() {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      setProduct(data);
    }

    getProduct();
  }, [id]);

  async function addToCart() {
    if (!product) return;

    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      size,
      quantity: 1,
    };

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      const oldCart = JSON.parse(localStorage.getItem("noctis_cart") || "[]");
      localStorage.setItem("noctis_cart", JSON.stringify([...oldCart, newItem]));
      setMessage("Ürün sepete eklendi.");
      return;
    }

    const { data: existingCart } = await supabase
      .from("carts")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!existingCart) {
      await supabase.from("carts").insert({
        user_id: user.id,
        items: [newItem],
      });

      setMessage("Ürün üyelik sepetinize eklendi.");
      return;
    }

    const oldItems = Array.isArray(existingCart.items) ? existingCart.items : [];
    const updatedItems = [...oldItems, newItem];

    await supabase
      .from("carts")
      .update({
        items: updatedItems,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    setMessage("Ürün üyelik sepetinize eklendi.");
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        Ürün yükleniyor...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#061326] to-black px-8 py-10 text-white">
      <Link href="/" className="text-sm tracking-[0.25em] text-blue-200">
        ← ANA SAYFA
      </Link>

      <section className="mx-auto grid max-w-6xl gap-12 py-20 md:grid-cols-2">
        <div className="flex h-[520px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#020817] via-[#0B1D3A] to-black">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-serif text-9xl text-white/20">N</span>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-4 text-xs uppercase tracking-[0.45em] text-blue-200">
            NOCTIS
          </p>

          <h1 className="font-serif text-5xl tracking-[0.2em]">
            {product.name}
          </h1>

          <p className="mt-6 text-3xl">{product.price} TL</p>

          <p className="mt-8 max-w-lg text-gray-300">
            {product.description}
          </p>

          <div className="mt-10">
            <p className="mb-3 text-sm uppercase tracking-[0.3em]">
              Beden Seç
            </p>

            <div className="flex gap-3">
              {["S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-12 w-14 rounded-full border ${
                    size === s
                      ? "border-blue-300 text-blue-200"
                      : "border-white/20"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={addToCart}
            className="mt-10 w-fit rounded-full border border-white/60 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] transition hover:bg-white hover:text-black"
          >
            Sepete Ekle
          </button>

          {message && <p className="mt-5 text-blue-200">{message}</p>}

          <div className="mt-6 flex gap-4">
            <Link
              href="/#urunler"
              className="text-sm text-gray-300 hover:text-white"
            >
              Alışverişe Devam Et
            </Link>

            <Link href="/cart" className="text-sm text-blue-200 hover:text-white">
              Sepete Git
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}