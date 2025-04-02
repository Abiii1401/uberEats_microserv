import { useState, useEffect } from "react";
import RestaurantCard, { Restaurant } from "./RestaurantCard";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search } from "lucide-react";

// Mock data - in a real app, this would come from an API
const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    name: "Burger Palace",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1899&q=80",
    cuisine: "American, Burgers",
    rating: 4.7,
    deliveryTime: "15-25 min",
    deliveryFee: 0,
    distance: "1.2 mi",
    promotion: "20% OFF",
    location: "Downtown"
  },
  {
    id: "2",
    name: "Pizza Express",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    cuisine: "Italian, Pizza",
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: 2.99,
    distance: "0.8 mi",
    location: "Midtown"
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
    isNew: true,
    location: "Uptown"
  },
  {
    id: "4",
    name: "Taco Haven",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    cuisine: "Mexican, Tacos",
    rating: 4.4,
    deliveryTime: "15-25 min",
    deliveryFee: 1.99,
    distance: "0.7 mi",
    location: "Downtown"
  },
  {
    id: "5",
    name: "Noodle House",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    cuisine: "Chinese, Noodles",
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: 2.99,
    distance: "1.1 mi",
    promotion: "Buy 1 Get 1 Free",
    location: "Chinatown" 
  },
  {
    id: "6",
    name: "Mediterranean Delight",
    image: "https://images.unsplash.com/photo-1540914124281-342587941389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    cuisine: "Mediterranean, Healthy",
    rating: 4.7,
    deliveryTime: "25-35 min",
    deliveryFee: 3.49,
    distance: "1.8 mi",
    isNew: true,
    location: "West Side"
  }
];

const cuisineOptions = [
  "All",
  "American",
  "Italian", 
  "Japanese", 
  "Mexican", 
  "Chinese", 
  "Mediterranean",
  "Indian",
  "Thai"
];

const locationOptions = [
  "All",
  "Downtown",
  "Midtown",
  "Uptown",
  "West Side",
  "Chinatown"
];

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Rating" },
  { value: "deliveryTime", label: "Delivery time" },
  { value: "distance", label: "Distance" }
];

interface RestaurantListProps {
  initialLocation?: string;
  initialCuisine?: string;
}

const RestaurantList = ({ initialLocation = "", initialCuisine = "All" }: RestaurantListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || "All");
  const [sortOption, setSortOption] = useState("recommended");
  
  // Update state when props change
  useEffect(() => {
    if (initialLocation) {
      // Try to match with our location options, otherwise keep as custom location
      const matchedLocation = locationOptions.find(
        loc => loc.toLowerCase() === initialLocation.toLowerCase()
      );
      setSelectedLocation(matchedLocation || initialLocation);
    }
    
    if (initialCuisine && initialCuisine !== "All") {
      setSelectedCuisine(initialCuisine);
    }
  }, [initialLocation, initialCuisine]);
  
  // Filter restaurants based on search query, cuisine, and location
  const filteredRestaurants = MOCK_RESTAURANTS.filter((restaurant) => {
    // Match search query
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Match cuisine
    const matchesCuisine = selectedCuisine === "All" || 
      restaurant.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase());
    
    // Match location - special handling for custom locations
    let matchesLocation = true;
    if (selectedLocation !== "All") {
      // Check if the location is one of our predefined options
      if (locationOptions.includes(selectedLocation)) {
        matchesLocation = restaurant.location === selectedLocation;
      } else {
        // For custom locations entered by user, we'll simulate a match for some restaurants
        // In a real app, you'd use geolocation APIs to find nearby restaurants
        matchesLocation = restaurant.id % 2 === 0; // Just a simple way to show some results
      }
    }
    
    return matchesSearch && matchesCuisine && matchesLocation;
  });
  
  // Sort restaurants based on selected option
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortOption) {
      case "rating":
        return b.rating - a.rating;
      case "deliveryTime":
        // Extract the first number from the delivery time string
        const getMinTime = (time: string) => parseInt(time.split("-")[0]);
        return getMinTime(a.deliveryTime) - getMinTime(b.deliveryTime);
      case "distance":
        return parseFloat(a.distance) - parseFloat(b.distance);
      default:
        return 0; // Keep original order for recommended
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search restaurants..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Cuisine" />
          </SelectTrigger>
          <SelectContent>
            {cuisineOptions.map((cuisine) => (
              <SelectItem key={cuisine} value={cuisine}>
                {cuisine}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {locationOptions.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
            {selectedLocation && !locationOptions.includes(selectedLocation) && (
              <SelectItem key={selectedLocation} value={selectedLocation}>
                {selectedLocation}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {filteredRestaurants.length === 0 ? (
        <div className="py-12 text-center">
          <h3 className="text-xl font-semibold">No restaurants found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
