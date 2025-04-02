
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { ShoppingCart, ArrowRight } from "lucide-react";
import CartItem, { CartItemType } from "./CartItem";
import { MenuItemType } from "../menu/MenuItem";
import { toast } from "sonner";

interface CartProps {
  cartItems: CartItemType[];
  onRemoveItem: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  onClearCart: () => void;
}

const Cart = ({ 
  cartItems, 
  onRemoveItem, 
  onQuantityChange,
  onClearCart 
}: CartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const total = subtotal + deliveryFee;
  
  // Mock authentication status - in a real app, this would come from auth context
  const isAuthenticated = false;
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      setIsOpen(false);
      navigate("/login");
      return;
    }
    
    // In a real app, this would redirect to a checkout page
    toast.success("Proceeding to checkout...");
    navigate("/checkout");
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-nomnom-orange text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cartItems.reduce((count, item) => count + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-auto py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-muted-foreground text-center">
                <ShoppingCart className="mx-auto h-12 w-12 mb-4 opacity-20" />
                <p>Your cart is empty</p>
                <p className="text-sm mt-1">Add items from a restaurant to get started</p>
              </div>
              <SheetClose asChild>
                <Button className="mt-6" onClick={() => navigate("/restaurants")}>
                  Browse Restaurants
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </SheetClose>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={onRemoveItem}
                  onQuantityChange={onQuantityChange}
                />
              ))}
            </>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <SheetFooter className="flex-col space-y-2 pt-4">
              <Button 
                className="w-full"
                onClick={handleCheckout}
              >
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={onClearCart}
              >
                Clear Cart
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
