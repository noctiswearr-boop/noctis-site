export type OrderStatus =
  | "Ödeme Bekliyor"
  | "Dekont Bekleniyor"
  | "Onaylandı"
  | "Kargoya Verildi"
  | "Teslim Edildi"
  | "İptal Edildi";

export type Order = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  productName: string;
  size: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
};

export const orders: Order[] = [
  {
    id: "1001",
    customerName: "Örnek Müşteri",
    phone: "05XX XXX XX XX",
    address: "Adres bilgisi burada görünecek",
    productName: "Eclipse Tee",
    size: "L",
    total: 799,
    status: "Ödeme Bekliyor",
    createdAt: "2026-06-14",
  },
];