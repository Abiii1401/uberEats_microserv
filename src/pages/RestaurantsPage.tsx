
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import RestaurantList from "@/components/restaurant/RestaurantList";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const RestaurantsPage = () => {
  const [searchParams] = useSearchParams();
  const cuisine = searchParams.get("cuisine");
  const location = searchParams.get("location");
  const { toast } = useToast();
  
  useEffect(() => {
    if (location) {
      toast({
        title: "Location found",
        description: `Showing restaurants near ${location}`,
      });
    }
  }, [location, toast]);
  
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="mb-8 text-3xl font-bold">
          {cuisine 
            ? `${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)} Restaurants`
            : "All Restaurants"}
          {location && ` near ${location}`}
        </h1>
        
        <RestaurantList initialLocation={location || ""} initialCuisine={cuisine || "All"} />
      </div>
    </Layout>
  );
};

export default RestaurantsPage;
