
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
}

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart?: (item: MenuItemType, quantity: number) => void;
}

const MenuItem = ({ item, onAddToCart }: MenuItemProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const {
    id,
    name,
    description,
    price,
    image,
    isPopular,
    isVegetarian,
    isSpicy
  } = item;
  
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(item, quantity);
      toast.success(`${quantity} × ${name} added to cart`);
      setIsDialogOpen(false);
      setQuantity(1);
    }
  };
  
  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));
  
  return (
    <>
      <div 
        className="flex flex-col md:flex-row border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="flex-1 p-4">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">{name}</h3>
              {(isPopular || isVegetarian || isSpicy) && (
                <div className="flex gap-2 mt-1">
                  {isPopular && (
                    <Badge variant="outline" className="bg-SLIITery-orange/10 text-SLIITery-orange border-SLIITery-orange/30">
                      Popular
                    </Badge>
                  )}
                  {isVegetarian && (
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                      Veg
                    </Badge>
                  )}
                  {isSpicy && (
                    <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                      Spicy
                    </Badge>
                  )}
                </div>
              )}
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {description}
              </p>
              <p className="mt-2 font-medium">${price.toFixed(2)}</p>
            </div>
            
            {image && (
              <div className="ml-4">
                <img 
                  src={image} 
                  alt={name} 
                  className="w-20 h-20 object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          
          {image && (
            <div className="w-full h-48 overflow-hidden rounded-md">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">${price.toFixed(2)}</span>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    decrementQuantity();
                  }}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <span className="w-8 text-center">{quantity}</span>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    incrementQuantity();
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">${(price * quantity).toFixed(2)}</span>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              className="w-full"
              onClick={handleAddToCart}
            >
              Add to Cart - ${(price * quantity).toFixed(2)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuItem;
