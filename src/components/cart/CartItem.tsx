
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { MenuItemType } from "../menu/MenuItem";

export interface CartItemType extends MenuItemType {
  quantity: number;
}

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

const CartItem = ({ item, onRemove, onQuantityChange }: CartItemProps) => {
  const { id, name, price, quantity, image } = item;
  
  const handleIncrement = () => {
    onQuantityChange(id, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };
  
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div className="flex items-center space-x-3">
        {image && (
          <img 
            src={image} 
            alt={name} 
            className="w-16 h-16 object-cover rounded" 
          />
        )}
        
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">${price.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <span className="w-8 text-center">{quantity}</span>
          
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={handleIncrement}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <span className="font-medium">
          ${(price * quantity).toFixed(2)}
        </span>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive"
          onClick={() => onRemove(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
