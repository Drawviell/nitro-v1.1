import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Button } from "@/components/ui/button";
    import { ShoppingCart } from "lucide-react";
    import { Part } from "./Parts";
    import { Plus, Minus } from "lucide-react";

    interface CartItem extends Part {
      quantity: number;
    }

    interface CartSummaryProps {
      cart: CartItem[];
      onUpdateQuantity: (partId: string, quantity: number) => void;
      onRemoveFromCart: (partId: string) => void;
      cartTotal: number;
      onPlaceOrder: () => void;
    }

    export function CartSummary({ cart, onUpdateQuantity, onRemoveFromCart, cartTotal, onPlaceOrder }: CartSummaryProps) {
      if (cart.length === 0) {
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Shopping Cart
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-4">
                Your cart is empty
              </p>
            </CardContent>
          </Card>
        );
      }

      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Shopping Cart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">x{item.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      x
                    </Button>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <Button className="w-full" onClick={onPlaceOrder}>
                  Proceed to Checkout (${cartTotal.toFixed(2)})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
