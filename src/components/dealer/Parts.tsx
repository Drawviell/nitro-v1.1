import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PartCard } from "./PartCard";
import { CategoryFilter } from "./CategoryFilter";
import { CartSummary } from "./CartSummary";
import { PARTS_CATEGORIES } from "@/types/trailer";

export interface Part {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

export interface CartItem extends Part {
  quantity: number;
}

const mockParts: Part[] = [
  {
    id: "1",
    name: "LED Tail Light Assembly",
    category: "12V Electrical",
    sku: "LT-001",
    price: 89.99,
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    id: "2",
    name: "Heavy Duty Axle",
    category: "Axles & Grease Caps",
    sku: "AX-002",
    price: 299.99,
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  },
  {
    id: "3",
    name: "Aluminum Fender",
    category: "Fenders",
    sku: "BF-003",
    price: 149.99,
    stock: 28,
    imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
  }
];

export function Parts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const categories = Array.from(PARTS_CATEGORIES);

  const filteredParts = mockParts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? part.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (part: Part) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === part.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === part.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...part, quantity: 1 }];
    });
  };

  const removeFromCart = (partId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== partId));
  };

  const updateQuantity = (partId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === partId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search parts by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredParts.map((part) => (
              <PartCard
                key={part.id}
                part={part}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>

        <div>
          <CartSummary
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            cartTotal={cartTotal}
          />
        </div>
      </div>
    </div>
  );
}
