"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Profile = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  first_discount_used: boolean;
};

type Order = {
  id: string;
  product_name: string;
  size: string;
  total: number;
  status: string;
  created_at: string;
};

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [message, setMessage] = useState("Yükleniyor...");

  useEffect(() => {
    getAccount();
  }, []);

  async function getAccount() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userData.user.id)
      .single();

    setProfile(profileData);

    const { data: orderData } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false });

    setOrders(orderData || []);
    setMessage("");
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#061326] to-black px-8 py-10 text-white">
      <Link href="/" className="text-sm tracking-[0.25em] text-blue-200">
        ← ANA SAYFA
      </Link>

      <section className="mx-auto max-w-5xl py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.45em] text-blue-200">
              NOCTIS HESAP
            </p>

            <h1 className="font-serif text-5xl tracking-[0.25em]">
              HESABIM
            </h1>
          </div>

          <button
            onClick={logout}
            className="w-fit rounded-full border border-red-400/40 px-6 py-3 text-sm text-red-300 hover:bg-red-400 hover:text-black"
          >
            Çıkış Yap
          </button>
        </div>

        {message && <p className="mt-10 text-blue-200">{message}</p>}

        {profile && (
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <h2 className="mb-6 text-2xl font-semibold">Üyelik Bilgileri</h2>

              <div className="space-y-4 text-gray-300">
                <p>
                  Ad Soyad:{" "}
                  <span className="text-white">{profile.full_name}</span>
                </p>

                <p>
                  E-posta:{" "}
                  <span className="break-all text-white">{profile.email}</span>
                </p>

                <p>
                  Telefon:{" "}
                  <span className="text-white">{profile.phone}</span>
                </p>

                <p>
                  İlk Sipariş İndirimi:{" "}
                  <span
                    className={
                      profile.first_discount_used
                        ? "text-red-300"
                        : "text-blue-200"
                    }
                  >
                    {profile.first_discount_used
                      ? "Kullanıldı"
                      : "Kullanılabilir"}
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <h2 className="mb-6 text-2xl font-semibold">Sipariş Özeti</h2>

              <div className="space-y-4 text-gray-300">
                <p>
                  Toplam Sipariş:{" "}
                  <span className="text-white">{orders.length}</span>
                </p>

                <p>
                  Aktif Sipariş:{" "}
                  <span className="text-white">
                    {
                      orders.filter(
                        (o) =>
                          o.status !== "Teslim Edildi" &&
                          o.status !== "İptal Edildi"
                      ).length
                    }
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="mb-6 text-2xl font-semibold">Siparişlerim</h2>

          {orders.length === 0 ? (
            <p className="text-gray-400">Henüz siparişiniz yok.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-gray-400">Sipariş No</p>
                      <p>#{order.id.slice(0, 8)}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Ürün</p>
                      <p>
                        {order.product_name} / {order.size}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">Tutar</p>
                      <p>{order.total} TL</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Durum</p>
                      <p className="text-blue-200">{order.status}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-gray-400">
                    {new Date(order.created_at).toLocaleString("tr-TR")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}