import { Button } from "@/components/ui/button";
    import { Card, CardContent, CardFooter } from "@/components/ui/card";
    import { Plus, Minus } from "lucide-react";

    interface Part {
      id: string;
      name: string;
      category: string;
      sku: string;
      price: number;
      stock: number;
      imageUrl?: string;
    }

    interface PartCardProps {
      part: Part;
      onAddToCart: (part: Part) => void;
      quantity?: number;
      onUpdateQuantity?: (id: string, quantity: number) => void;
    }

    export function PartCard({ part, onAddToCart, quantity, onUpdateQuantity }: PartCardProps) {
      return (
        <Card className="overflow-hidden">
          <div className="aspect-square relative">
            <img
              src={part.imageUrl || `https://images.unsplash.com/photo-1518770660439-4636190af475`}
              alt={part.name}
              className="object-cover w-full h-full"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{part.name}</h3>
                <p className="text-sm text-muted-foreground">{part.sku}</p>
              </div>
              <span className="font-bold">${part.price.toFixed(2)}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Stock: {part.stock}</p>
          </CardContent>
          <CardFooter className="p-4">
            {quantity !== undefined && onUpdateQuantity ? (
              <div className="flex items-center gap-2 w-full">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onUpdateQuantity(part.id, quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onUpdateQuantity(part.id, quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button className="w-full" onClick={() => onAddToCart(part)}>
                Add to Cart
              </Button>
            )}
          </CardFooter>
        </Card>
      );
    }
