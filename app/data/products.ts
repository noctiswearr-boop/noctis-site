export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  visible: boolean;
  description: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Eclipse Tee",
    category: "Tişört",
    price: 799,
    stock: 10,
    visible: true,
    description: "Oversize kesim, ağır pamuk kumaş ve premium DTF baskı.",
  },
  {
    id: "2",
    name: "Lunar Sweatshirt",
    category: "Sweatshirt",
    price: 1299,
    stock: 0,
    visible: false,
    description: "Gece mavisi detaylara sahip premium sweatshirt.",
  },
  {
    id: "3",
    name: "Noctis Hoodie",
    category: "Hoodie",
    price: 1499,
    stock: 0,
    visible: false,
    description: "NOCTIS imzalı ağır kumaş hoodie.",
  },
  {
    id: "4",
    name: "Midnight Cap",
    category: "Şapka",
    price: 499,
    stock: 0,
    visible: false,
    description: "Sınırlı üretim NOCTIS şapka.",
  },
  {
    id: "5",
    name: "Shadow Pants",
    category: "Pantolon",
    price: 1199,
    stock: 0,
    visible: false,
    description: "Koyu tonlarda rahat kesim pantolon.",
  },
  {
    id: "6",
    name: "Night Shorts",
    category: "Şort",
    price: 699,
    stock: 0,
    visible: false,
    description: "Yazlık koyu ton NOCTIS şort.",
  },
];