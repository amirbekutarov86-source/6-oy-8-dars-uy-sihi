export type Category = "computers" | "appliances" | "smartphones";

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "computers", label: "Computers" },
  { key: "appliances", label: "Appliances" },
  { key: "smartphones", label: "Smartphones" },
];

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  rating: number;
  stock: number;
  specs: string[];
}
