
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  distance: string;
  location?: string;
  isNew?: boolean;
  promotion?: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const {
    id,
    name,
    image,
    cuisine,
    rating,
    deliveryTime,
    deliveryFee,
    distance,
    isNew,
    promotion
  } = restaurant;

  return (
    <Link
      to={`/restaurant/${id}`}
      className="group rounded-lg overflow-hidden bg-card border border-border hover:border-primary/20 hover:shadow-md transition-all"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isNew && (
          <Badge
            className="absolute top-2 left-2 bg-nomnom-orange text-white"
          >
            New
          </Badge>
        )}
        {promotion && (
          <Badge
            variant="outline"
            className="absolute top-2 right-2 bg-white/95 text-nomnom-orange border-nomnom-orange"
          >
            {promotion}
          </Badge>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 group-hover:text-nomnom-orange transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm mb-2">{cuisine}</p>
        
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center bg-green-50 text-green-700 px-1.5 py-0.5 rounded">
            <Star className="fill-current text-green-700 h-3 w-3 mr-0.5" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{deliveryTime}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{distance}</span>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm">
            {deliveryFee === 0
              ? "Free delivery"
              : `Delivery: $${deliveryFee.toFixed(2)}`}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
