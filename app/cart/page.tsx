"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  size: string;
  quantity: number;
};

type BankAccount = {
  id: string;
  bank_name: string;
  account_holder: string;
  iban: string;
  is_default: boolean;
};

type Profile = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  first_discount_used: boolean;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getDefaultBank();
    getCartAndProfile();
  }, []);

  async function getCartAndProfile() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      setCart(JSON.parse(localStorage.getItem("noctis_cart") || "[]"));
      return;
    }

    setUserId(user.id);

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileData) {
      setProfile(profileData);
      setCustomerName(profileData.full_name || "");
      setCustomerEmail(profileData.email || user.email || "");
      setPhone(profileData.phone || "");
    } else {
      setCustomerEmail(user.email || "");
    }

    const { data: cartData } = await supabase
      .from("carts")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (cartData && Array.isArray(cartData.items)) {
      setCart(cartData.items);
    } else {
      setCart([]);
    }
  }

  async function getDefaultBank() {
    const { data } = await supabase
      .from("bank_accounts")
      .select("*")
      .eq("is_default", true)
      .limit(1)
      .single();

    setBankAccount(data || null);
  }

  async function saveCart(updatedCart: CartItem[]) {
    setCart(updatedCart);

    if (!userId) {
      localStorage.setItem("noctis_cart", JSON.stringify(updatedCart));
      return;
    }

    const { data: existingCart } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (existingCart) {
      await supabase
        .from("carts")
        .update({
          items: updatedCart,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);
    } else {
      await supabase.from("carts").insert({
        user_id: userId,
        items: updatedCart,
      });
    }
  }

  async function removeItem(index: number) {
    const updatedCart = cart.filter((_, i) => i !== index);
    await saveCart(updatedCart);
  }

  async function copyText(text: string, successMessage: string) {
    await navigator.clipboard.writeText(text);
    setMessage(successMessage);
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const hasFirstDiscount = profile && profile.first_discount_used === false;
  const discount = hasFirstDiscount ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  async function sendOrderReceivedEmail(orderData: any) {
    try {
      await fetch("/api/send-order-received", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
    } catch (error) {
      console.error("Sipariş maili gönderilemedi:", error);
    }
  }

  async function completeOrder() {
    if (cart.length === 0) {
      setMessage("Sepet boş.");
      return;
    }

    if (!customerName || !customerEmail || !phone || !address) {
      setMessage("Lütfen ad soyad, e-posta, telefon ve adres bilgilerini doldurun.");
      return;
    }

    setMessage("Stok kontrol ediliyor...");

    for (const item of cart) {
      const { data: product, error } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.id)
        .single();

      if (error || !product) {
        setMessage(`${item.name} ürünü bulunamadı.`);
        return;
      }

      if (product.stock < item.quantity) {
        setMessage(`${item.name} için yeterli stok yok.`);
        return;
      }
    }

    setMessage("Sipariş oluşturuluyor...");

    const { data: createdOrder, error } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        customer_name: customerName,
        email: customerEmail,
        phone,
        address,
        product_name: cart.map((item) => item.name).join(", "),
        size: cart.map((item) => item.size).join(", "),
        total,
        status: "Ödeme Bekliyor",
        items: cart,
        note,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      setMessage("Sipariş oluşturulurken hata oluştu.");
      return;
    }

    await sendOrderReceivedEmail({
      id: createdOrder?.id || "Yeni Sipariş",
      full_name: customerName,
      email: customerEmail,
      phone,
      address,
      items: cart,
      total_price: total,
      note,
    });

    for (const item of cart) {
      const { data: product } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.id)
        .single();

      const newStock = Math.max((product?.stock || 0) - item.quantity, 0);

      await supabase
        .from("products")
        .update({
          stock: newStock,
          visible: newStock > 0,
        })
        .eq("id", item.id);
    }

    if (hasFirstDiscount && profile) {
      await supabase
        .from("profiles")
        .update({ first_discount_used: true })
        .eq("id", profile.id);
    }

    if (userId) {
      await supabase
        .from("carts")
        .update({
          items: [],
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);
    } else {
      localStorage.removeItem("noctis_cart");
    }

    setCart([]);
    setCustomerName("");
    setCustomerEmail("");
    setPhone("");
    setAddress("");
    setNote("");
    setMessage(
      "Siparişiniz oluşturuldu. Sipariş detayları e-posta adresinize gönderildi."
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#061326] to-black px-8 py-10 text-white">
      <Link href="/" className="text-sm tracking-[0.25em] text-blue-200">
        ← ANA SAYFA
      </Link>

      <section className="mx-auto max-w-5xl py-20">
        <h1 className="font-serif text-5xl tracking-[0.25em]">SEPET</h1>

        {cart.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <p>{message || "Sepetiniz şu anda boş."}</p>

            <Link
              href="/#urunler"
              className="mt-8 inline-block rounded-full border border-white/50 px-6 py-3 text-sm uppercase tracking-[0.25em] hover:bg-white hover:text-black"
            >
              Ürünlere Dön
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <h2 className="mb-6 text-2xl font-semibold">Sepetiniz</h2>

              {profile && hasFirstDiscount && (
                <p className="mb-6 rounded-2xl border border-blue-300/20 bg-blue-300/10 p-4 text-sm text-blue-100">
                  Üye olduğunuz için ilk siparişinizde %10 indirim uygulanıyor.
                </p>
              )}

              <div className="space-y-5">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-white/10 pb-5"
                  >
                    <div>
                      <h3 className="text-2xl">{item.name}</h3>
                      <p className="text-gray-400">Beden: {item.size}</p>
                      <p className="text-gray-400">Adet: {item.quantity}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl">{item.price} TL</p>
                      <button
                        onClick={() => removeItem(index)}
                        className="mt-3 text-sm text-red-300"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gray-300">Ara Toplam</span>
                  <span className="text-2xl">{subtotal} TL</span>
                </div>

                {hasFirstDiscount && (
                  <div className="flex items-center justify-between text-blue-200">
                    <span className="text-lg">Üye İndirimi (%10)</span>
                    <span className="text-2xl">-{discount} TL</span>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xl">Ödenecek Tutar</span>
                  <span className="text-4xl">{total} TL</span>
                </div>
              </div>

              <Link
                href="/#urunler"
                className="mt-8 inline-block rounded-full border border-white/40 px-8 py-4 text-center text-sm uppercase tracking-[0.25em] hover:bg-white hover:text-black"
              >
                Alışverişe Devam Et
              </Link>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <h2 className="mb-6 text-2xl font-semibold">
                Sipariş Bilgileri
              </h2>

              {!profile && (
                <p className="mb-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-gray-300">
                  Üye olursanız ilk siparişinizde %10 indirim kazanırsınız.{" "}
                  <Link href="/register" className="text-blue-200">
                    Üye Ol
                  </Link>
                </p>
              )}

              <div className="space-y-4">
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ad Soyad"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
                />

                <input
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="E-posta"
                  type="email"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
                />

                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefon"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
                />

                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Adres"
                  className="min-h-28 w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
                />

                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Sipariş notu"
                  className="min-h-20 w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-blue-300"
                />
              </div>

              <div className="mt-8 rounded-2xl border border-blue-300/20 bg-black/30 p-6">
                <h3 className="text-xl font-semibold">
                  Havale / EFT Bilgileri
                </h3>

                {bankAccount ? (
                  <div className="mt-5 space-y-4 text-sm text-gray-300">
                    <p>
                      Banka:{" "}
                      <span className="text-white">
                        {bankAccount.bank_name}
                      </span>
                    </p>

                    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-gray-400">Alıcı</p>
                        <p className="text-white">
                          {bankAccount.account_holder}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          copyText(
                            bankAccount.account_holder,
                            "Alıcı adı kopyalandı."
                          )
                        }
                        className="rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black"
                      >
                        Alıcıyı Kopyala
                      </button>
                    </div>

                    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-gray-400">IBAN</p>
                        <p className="break-all text-white">
                          {bankAccount.iban}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          copyText(bankAccount.iban, "IBAN kopyalandı.")
                        }
                        className="rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black"
                      >
                        IBAN Kopyala
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-5 text-sm text-red-300">
                    Varsayılan IBAN bulunamadı. Admin panelinden IBAN ekleyin
                    veya varsayılan yapın.
                  </p>
                )}
              </div>

              <button
                onClick={completeOrder}
                className="mt-8 w-full rounded-full border border-white/70 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] hover:bg-white hover:text-black"
              >
                Siparişi Tamamla
              </button>

              {message && <p className="mt-5 text-blue-200">{message}</p>}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}