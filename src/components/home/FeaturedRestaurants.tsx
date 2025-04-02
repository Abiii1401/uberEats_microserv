
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import RestaurantCard, { Restaurant } from "../restaurant/RestaurantCard";

// Mock data for featured restaurants
const FEATURED_RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    name: "Burger Palace",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1899&q=80",
    cuisine: "American, Burgers",
    rating: 4.7,
    deliveryTime: "15-25 min",
    deliveryFee: 0,
    distance: "1.2 mi",
    promotion: "20% OFF"
  },
  {
    id: "2",
    name: "Pizza Express",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    cuisine: "Italian, Pizza",
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: 2.99,
    distance: "0.8 mi"
  },
  {
    id: "3",
    name: "Sushi World",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    cuisine: "Japanese, Sushi",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: 3.99,
    distance: "1.5 mi",
    isNew: true
  }
];

const FeaturedRestaurants = () => {
  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Featured Restaurants</h2>
        <Link to="/restaurants">
          <Button variant="ghost" className="flex items-center">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_RESTAURANTS.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedRestaurants;
