import { useState } from "react";
    import { Input } from "@/components/ui/input";
    import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from "@/components/ui/select";
    import { Layout } from "@/components/Layout";
    import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from "@/components/ui/table";
    import { Badge } from "@/components/ui/badge";
    import { useToast } from "@/hooks/use-toast";
    import { PARTS_CATEGORIES } from "@/types/trailer";
    import { Button } from "@/components/ui/button";
    import { CartSummary } from "@/components/dealer/CartSummary";
    import { PartCard } from "@/components/dealer/PartCard";

    interface Part {
      id: string;
      name: string;
      price: number;
      category: string;
      status: string;
      images: string[];
    }

    interface CartItem extends Part {
      quantity: number;
    }

    export default function Parts() {
      const [searchTerm, setSearchTerm] = useState("");
      const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
      const [cart, setCart] = useState<CartItem[]>([]);
      const { toast } = useToast();

      const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
          setSelectedImages(files);
          toast({
            title: "Images selected",
            description: `${files.length} image(s) ready to upload`,
          });
        }
      };

      const partsData = [
        {
          id: "04-020-100",
          name: "3M Scotch Locks for 14-16ga wire - per 100",
          price: 10.50,
          category: "12V Electrical",
          status: "In Stock",
          images: [],
        },
        {
          id: "04-021-8LHHB",
          name: "8' Molded Leader Harness for s/a trailers w/ harness",
          price: 26.00,
          category: "12V Electrical",
          status: "In Stock",
          images: [],
        },
        {
          id: "04-020WB35",
          name: "4 Way Flat Harness - 35'",
          price: 13.10,
          category: "12V Electrical",
          status: "In Stock",
          images: [],
        },
      ];

      const filteredParts = partsData.filter(part => {
        const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase());
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

      const updateQuantity = (partId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCart(currentCart =>
          currentCart.map(item =>
            item.id === partId ? { ...item, quantity: newQuantity } : item
          )
        );
      };

      const removeFromCart = (partId: string) => {
        setCart(currentCart => currentCart.filter(item => item.id !== partId));
      };

      const handlePlaceOrder = () => {
        toast({
          title: "Order Placed",
          description: "Your order has been placed successfully.",
        });
        setCart([]);
      };

      const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

      return (
        <Layout userRole="admin" userName="Admin User" companyName="Nitro Trailers">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold tracking-tight">Parts Catalog</h1>
            </div>

            <div className="flex gap-4 items-center">
              <Input
                placeholder="Search parts..."
                className="max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select defaultValue="all-categories" onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  {PARTS_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue="all-status">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  <SelectItem value="discontinued">Discontinued</SelectItem>
                </SelectContent>
              </Select>
              <Button className="ml-auto bg-blue-600 hover:bg-blue-700">
                Add Part
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-6">
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
                  onPlaceOrder={handlePlaceOrder}
                />
              </div>
            </div>
          </div>
        </Layout>
      );
    }
