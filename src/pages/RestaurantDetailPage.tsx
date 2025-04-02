
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MenuSection from "@/components/menu/MenuSection";
import { MenuItemType } from "@/components/menu/MenuItem";
import { CartItemType } from "@/components/cart/CartItem";
import Cart from "@/components/cart/Cart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Phone, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for a restaurant
const MOCK_RESTAURANT = {
  id: "1",
  name: "Burger Palace",
  description: "The best burgers in town, made with premium ingredients and cooked to perfection.",
  coverImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  logo: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  cuisines: ["American", "Burgers", "Fast Food"],
  rating: 4.7,
  numRatings: 350,
  priceRange: "$$",
  address: "123 Main St, Anytown, USA",
  hours: "10:00 AM - 10:00 PM",
  phone: "(555) 123-4567",
  deliveryTime: "15-25 min",
  deliveryFee: 0,
  minOrder: 10,
};

// Mock menu data
const MOCK_MENU = {
  popular: [
    {
      id: "p1",
      name: "Classic Cheeseburger",
      description: "Angus beef patty with cheddar cheese, lettuce, tomato, and house sauce",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      isPopular: true
    },
    {
      id: "p2",
      name: "Loaded Fries",
      description: "Crispy fries topped with cheese sauce, bacon, and green onions",
      price: 5.99,
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      isPopular: true
    },
  ],
  burgers: [
    {
      id: "b1",
      name: "Classic Cheeseburger",
      description: "Angus beef patty with cheddar cheese, lettuce, tomato, and house sauce",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      isPopular: true
    },
    {
      id: "b2",
      name: "Double Bacon Burger",
      description: "Two Angus beef patties, crispy bacon, cheddar cheese, and BBQ sauce",
      price: 11.99,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "b3",
      name: "Veggie Burger",
      description: "Plant-based patty with avocado, lettuce, tomato, and vegan mayo",
      price: 9.99,
      isVegetarian: true
    },
    {
      id: "b4",
      name: "Spicy Jalapeño Burger",
      description: "Angus beef patty with pepper jack cheese, jalapeños, and spicy sauce",
      price: 10.49,
      isSpicy: true
    }
  ],
  sides: [
    {
      id: "s1",
      name: "French Fries",
      description: "Crispy golden fries with your choice of seasoning",
      price: 3.99,
      isVegetarian: true
    },
    {
      id: "s2",
      name: "Onion Rings",
      description: "Crunchy battered onion rings served with dipping sauce",
      price: 4.99,
      isVegetarian: true
    },
    {
      id: "s3",
      name: "Loaded Fries",
      description: "Crispy fries topped with cheese sauce, bacon, and green onions",
      price: 5.99,
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      isPopular: true
    }
  ],
  drinks: [
    {
      id: "d1",
      name: "Soft Drink",
      description: "Your choice of Coke, Diet Coke, Sprite, or Dr. Pepper",
      price: 2.49,
      isVegetarian: true
    },
    {
      id: "d2",
      name: "Milkshake",
      description: "Handspun shake with vanilla ice cream and your choice of mix-ins",
      price: 4.99,
      isVegetarian: true
    },
    {
      id: "d3",
      name: "Iced Tea",
      description: "Fresh brewed iced tea, sweetened or unsweetened",
      price: 2.49,
      isVegetarian: true
    }
  ]
};

const RestaurantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [cart, setCart] = useState<CartItemType[]>([]);
  
  // In a real app, you would fetch the restaurant data from an API
  const restaurant = MOCK_RESTAURANT;
  const menu = MOCK_MENU;
  
  const handleAddToCart = (item: MenuItemType, quantity: number) => {
    setCart(prevCart => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Update the quantity of the existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Add the new item to the cart
        return [...prevCart, { ...item, quantity }];
      }
    });
  };
  
  const handleRemoveFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };
  
  const handleQuantityChange = (id: string, quantity: number) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const handleClearCart = () => {
    setCart([]);
  };
  
  return (
    <Layout>
      {/* Restaurant Cover and Info */}
      <div className="relative h-64 md:h-80">
        <div className="absolute inset-0">
          <img
            src={restaurant.coverImage}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>
      
      <div className="container-custom -mt-20 relative z-10">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={restaurant.logo}
              alt={restaurant.name}
              className="rounded-xl w-24 h-24 object-cover"
            />
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                  <p className="text-muted-foreground">{restaurant.cuisines.join(", ")}</p>
                </div>
                
                <div className="flex items-center">
                  <Badge className="bg-nomnom-orange text-white flex items-center gap-1">
                    <Star className="fill-white stroke-white h-3 w-3" />
                    <span>{restaurant.rating}</span>
                  </Badge>
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({restaurant.numRatings} ratings)
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{restaurant.hours}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{restaurant.address}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{restaurant.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Menu sections */}
        <div className="mt-6 mb-12">
          <Tabs defaultValue="popular">
            <TabsList className="mb-6 bg-background border">
              <TabsTrigger value="popular">Popular Items</TabsTrigger>
              <TabsTrigger value="burgers">Burgers</TabsTrigger>
              <TabsTrigger value="sides">Sides</TabsTrigger>
              <TabsTrigger value="drinks">Drinks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="popular">
              <MenuSection 
                title="Popular Items" 
                items={menu.popular} 
                onAddToCart={handleAddToCart}
              />
            </TabsContent>
            
            <TabsContent value="burgers">
              <MenuSection 
                title="Burgers" 
                items={menu.burgers} 
                onAddToCart={handleAddToCart}
              />
            </TabsContent>
            
            <TabsContent value="sides">
              <MenuSection 
                title="Sides" 
                items={menu.sides} 
                onAddToCart={handleAddToCart}
              />
            </TabsContent>
            
            <TabsContent value="drinks">
              <MenuSection 
                title="Drinks" 
                items={menu.drinks} 
                onAddToCart={handleAddToCart}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Cart component */}
      <div className="fixed bottom-6 right-6 z-50">
        <Cart 
          cartItems={cart}
          onRemoveItem={handleRemoveFromCart}
          onQuantityChange={handleQuantityChange}
          onClearCart={handleClearCart}
        />
      </div>
    </Layout>
  );
};

export default RestaurantDetailPage;
