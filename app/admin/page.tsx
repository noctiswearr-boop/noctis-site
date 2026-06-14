"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  visible: boolean;
  description: string;
  image_url: string | null;
};

type Order = {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  product_name: string;
  size: string;
  total: number;
  status: string;
  created_at: string;
};

type BankAccount = {
  id: string;
  bank_name: string;
  account_holder: string;
  iban: string;
  is_default: boolean;
};

type Category = {
  id: string;
  name: string;
  visible: boolean;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const activeOrders = orders.filter(
    (o) => o.status !== "Teslim Edildi" && o.status !== "İptal Edildi"
  );

  const orderHistory = orders.filter(
    (o) => o.status === "Teslim Edildi" || o.status === "İptal Edildi"
  );

  async function getProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    setProducts(data || []);
  }

  async function getOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders(data || []);
  }

  async function getBankAccounts() {
    const { data } = await supabase
      .from("bank_accounts")
      .select("*")
      .order("created_at", { ascending: false });

    setBankAccounts(data || []);
  }

  async function getCategories() {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: true });

    setCategories(data || []);
  }

  useEffect(() => {
    getProducts();
    getOrders();
    getBankAccounts();
    getCategories();
  }, []);

  async function toggleProduct(product: Product) {
    await supabase
      .from("products")
      .update({ visible: !product.visible })
      .eq("id", product.id);

    getProducts();
  }

  async function deleteProduct(id: string) {
    if (!confirm("Bu ürünü silmek istediğine emin misin?")) return;

    await supabase.from("products").delete().eq("id", id);
    getProducts();
  }

  async function updateOrderStatus(id: string, status: string) {
    await supabase.from("orders").update({ status }).eq("id", id);
    getOrders();
  }

  async function setDefaultBank(id: string) {
    await supabase
      .from("bank_accounts")
      .update({ is_default: false })
      .neq("id", id);

    await supabase
      .from("bank_accounts")
      .update({ is_default: true })
      .eq("id", id);

    getBankAccounts();
  }

  async function deleteBank(id: string) {
    if (!confirm("Bu IBAN hesabını silmek istediğine emin misin?")) return;

    await supabase.from("bank_accounts").delete().eq("id", id);
    getBankAccounts();
  }

  async function toggleCategory(category: Category) {
    await supabase
      .from("categories")
      .update({ visible: !category.visible })
      .eq("id", category.id);

    getCategories();
  }

  async function deleteCategory(id: string) {
    if (!confirm("Bu kategoriyi silmek istediğine emin misin?")) return;

    await supabase.from("categories").delete().eq("id", id);
    getCategories();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#061326] to-black p-8 text-white">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-serif text-4xl tracking-[0.25em]">
          NOCTIS ADMIN
        </h1>

        <Link
          href="/"
          className="rounded-full border border-white/40 px-5 py-2 text-sm hover:bg-white hover:text-black"
        >
          Siteye Dön
        </Link>
      </div>

      <div className="mb-10 grid gap-6 md:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-gray-400">Toplam Ürün</p>
          <h2 className="mt-3 text-3xl">{products.length}</h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-gray-400">Yayındaki Ürün</p>
          <h2 className="mt-3 text-3xl">
            {products.filter((p) => p.visible).length}
          </h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-gray-400">Aktif Sipariş</p>
          <h2 className="mt-3 text-3xl">{activeOrders.length}</h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-gray-400">Banka Hesabı</p>
          <h2 className="mt-3 text-3xl">{bankAccounts.length}</h2>
        </div>
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Ürün Yönetimi</h2>

          <Link
            href="/admin/add-product"
            className="rounded-full border border-white/40 px-6 py-3 hover:bg-white hover:text-black"
          >
            Yeni Ürün Ekle
          </Link>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="grid gap-4 rounded-2xl border border-white/10 bg-black/30 p-5 md:grid-cols-6"
            >
              <div>
                <p className="text-gray-400">Ürün</p>
                <p>{product.name}</p>
              </div>

              <div>
                <p className="text-gray-400">Fiyat</p>
                <p>{product.price} TL</p>
              </div>

              <div>
                <p className="text-gray-400">Stok</p>
                <p>{product.stock}</p>
              </div>

              <div>
                <p className="text-gray-400">Durum</p>
                <p className={product.visible ? "text-green-400" : "text-red-400"}>
                  {product.visible ? "Yayında" : "Gizli"}
                </p>
              </div>

              <div>
                <p className="text-gray-400">Fotoğraf</p>
                <p>{product.image_url ? "Var" : "Yok"}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/admin/edit-product/${product.id}`}
                  className="rounded-full border border-white/30 px-4 py-2 text-sm hover:bg-white hover:text-black"
                >
                  Düzenle
                </Link>

                <button
                  onClick={() => toggleProduct(product)}
                  className="rounded-full border border-white/30 px-4 py-2 text-sm hover:bg-white hover:text-black"
                >
                  {product.visible ? "Gizle" : "Yayınla"}
                </button>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="rounded-full border border-red-400/40 px-4 py-2 text-sm text-red-300 hover:bg-red-400 hover:text-black"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Sipariş Yönetimi</h2>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="rounded-full border border-white/40 px-5 py-2 text-sm hover:bg-white hover:text-black"
          >
            {showHistory ? "Sipariş Geçmişini Gizle" : "Sipariş Geçmişi"}
          </button>
        </div>

        {activeOrders.length === 0 ? (
          <p className="text-gray-400">Aktif sipariş yok.</p>
        ) : (
          <div className="space-y-4">
            {activeOrders.map((order) => (
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
                    <p className="text-gray-400">Müşteri</p>
                    <p>{order.customer_name}</p>
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
                </div>

                <p className="mt-4 text-gray-300">Telefon: {order.phone}</p>
                <p className="mt-2 text-blue-200">Durum: {order.status}</p>
                <p className="mt-2 text-gray-400">Adres: {order.address}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => updateOrderStatus(order.id, "Onaylandı")}
                    className="rounded-full border border-white/30 px-4 py-2 text-sm hover:bg-white hover:text-black"
                  >
                    Onayla
                  </button>

                  <button
                    onClick={() => updateOrderStatus(order.id, "Kargoya Verildi")}
                    className="rounded-full border border-white/30 px-4 py-2 text-sm hover:bg-white hover:text-black"
                  >
                    Kargoya Ver
                  </button>

                  <button
                    onClick={() => updateOrderStatus(order.id, "Teslim Edildi")}
                    className="rounded-full border border-white/30 px-4 py-2 text-sm hover:bg-white hover:text-black"
                  >
                    Teslim Edildi
                  </button>

                  <button
                    onClick={() => updateOrderStatus(order.id, "İptal Edildi")}
                    className="rounded-full border border-red-400/40 px-4 py-2 text-sm text-red-300 hover:bg-red-400 hover:text-black"
                  >
                    İptal Et
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showHistory && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-6">
            <h3 className="mb-5 text-xl font-semibold">Sipariş Geçmişi</h3>

            {orderHistory.length === 0 ? (
              <p className="text-gray-400">Geçmiş sipariş yok.</p>
            ) : (
              <div className="max-h-[420px] space-y-3 overflow-y-auto pr-2">
                {orderHistory.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p>
                      #{order.id.slice(0, 8)} — {order.customer_name}
                    </p>
                    <p className="text-gray-400">
                      {order.product_name} / {order.size}
                    </p>
                    <p>{order.total} TL</p>
                    <p
                      className={
                        order.status === "Teslim Edildi"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {order.status}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <section className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Kategori Yönetimi</h2>

            <Link
              href="/admin/add-category"
              className="rounded-full border border-white/40 px-5 py-2 text-sm hover:bg-white hover:text-black"
            >
              Kategori Ekle
            </Link>
          </div>

          <div className="space-y-3">
            {categories.length === 0 ? (
              <p className="text-gray-400">Henüz kategori eklenmedi.</p>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <div>
                    <p>{category.name}</p>
                    <p
                      className={
                        category.visible
                          ? "text-sm text-green-400"
                          : "text-sm text-red-400"
                      }
                    >
                      {category.visible ? "Yayında" : "Gizli"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleCategory(category)}
                      className="rounded-full border border-white/30 px-4 py-2 text-sm hover:bg-white hover:text-black"
                    >
                      {category.visible ? "Gizle" : "Yayınla"}
                    </button>

                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="rounded-full border border-red-400/40 px-4 py-2 text-sm text-red-300 hover:bg-red-400 hover:text-black"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Banka Hesapları</h2>

            <Link
              href="/admin/add-bank"
              className="rounded-full border border-white/40 px-5 py-2 text-sm hover:bg-white hover:text-black"
            >
              IBAN Ekle
            </Link>
          </div>

          <div className="space-y-4">
            {bankAccounts.length === 0 ? (
              <p className="text-gray-400">Henüz banka hesabı eklenmedi.</p>
            ) : (
              bankAccounts.map((bank) => (
                <div
                  key={bank.id}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <p className="text-sm text-blue-200">
                    {bank.is_default ? "Varsayılan Hesap" : "Ek Hesap"}
                  </p>

                  <p className="mt-3 text-lg">{bank.bank_name}</p>
                  <p className="mt-1 text-gray-300">{bank.account_holder}</p>
                  <p className="mt-1 text-gray-300">{bank.iban}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => setDefaultBank(bank.id)}
                      className="rounded-full border border-white/30 px-4 py-2 text-sm hover:bg-white hover:text-black"
                    >
                      Varsayılan Yap
                    </button>

                    <button
                      onClick={() => deleteBank(bank.id)}
                      className="rounded-full border border-red-400/40 px-4 py-2 text-sm text-red-300 hover:bg-red-400 hover:text-black"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}