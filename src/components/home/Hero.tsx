
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Hero = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!location.trim()) {
      toast({
        title: "Please enter an address",
        description: "We need your address to find restaurants near you",
        variant: "destructive",
      });
      return;
    }
    
    navigate(`/restaurants?location=${encodeURIComponent(location.trim())}`);
    toast({
      title: "Finding restaurants",
      description: `Searching for restaurants near ${location}`,
    });
  };
  
  return (
    <div className="relative">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10" />
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Delicious Food"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-20 py-20 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Delicious Food, <br className="hidden md:inline" />
          Delivered To Your Door
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
          Order from your favorite restaurants and enjoy the best meals 
          without leaving home. Fast delivery, easy ordering.
        </p>
        
        <form onSubmit={handleSearch} className="w-full max-w-lg flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your address"
              className="bg-white/95 h-12 pl-10 border-0"
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-SLIITery-gray" />
          </div>
          
          <Button type="submit" size="lg" className="bg-SLIITery-orange hover:bg-SLIITery-orange/90">
            <Search className="h-5 w-5 mr-2" />
            Find Food
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
