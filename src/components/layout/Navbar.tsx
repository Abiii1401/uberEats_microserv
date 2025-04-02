
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  Home, 
  History,
  LogIn,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger, 
  DialogClose
} from "@/components/ui/dialog";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  
  // Mock suggestions for search
  const suggestions = [
    { value: "pizza", label: "Pizza restaurants" },
    { value: "burger", label: "Burger restaurants" },
    { value: "sushi", label: "Sushi restaurants" },
    { value: "italian", label: "Italian cuisine" },
    { value: "mexican", label: "Mexican cuisine" },
    { value: "chinese", label: "Chinese cuisine" },
    { value: "downtown", label: "Restaurants in Downtown" },
    { value: "midtown", label: "Restaurants in Midtown" },
  ];
  
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "We hope to see you again soon!",
    });
    navigate("/");
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    // Check if it's likely a cuisine or a location
    const isCuisine = ["pizza", "burger", "sushi", "italian", "mexican", "chinese", "japanese", "thai", "indian", "mediterranean"].some(
      cuisine => searchQuery.toLowerCase().includes(cuisine)
    );
    
    if (isCuisine) {
      navigate(`/restaurants?cuisine=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/restaurants?location=${encodeURIComponent(searchQuery.trim())}`);
    }
    
    setIsSearchOpen(false);
    setIsCommandOpen(false);
    setSearchQuery("");
  };

  // Function to get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name.split(' ')
      .map(part => part[0]?.toUpperCase())
      .slice(0, 2)
      .join('');
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 z-20">
            <div className="relative w-8 h-8 rounded-full bg-SLIITery-orange flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-xl">SLIITery</span>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-foreground hover:text-SLIITery-orange transition-colors">
                Home
              </Link>
              <Link to="/restaurants" className="text-foreground hover:text-SLIITery-orange transition-colors">
                Restaurants
              </Link>
              <Link to="/about" className="text-foreground hover:text-SLIITery-orange transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-foreground hover:text-SLIITery-orange transition-colors">
                Contact
              </Link>
            </nav>
          )}
          
          {/* Desktop Search & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Dialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
              <DialogTrigger asChild>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search restaurants..."
                    className="w-64 pl-10 py-2"
                    onClick={() => setIsCommandOpen(true)}
                    readOnly
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px] p-0">
                <Command className="rounded-lg border shadow-md">
                  <form onSubmit={handleSearch}>
                    <CommandInput 
                      placeholder="Search restaurants, cuisines or locations..." 
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                      className="h-12"
                    />
                  </form>
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      {suggestions.map((suggestion) => (
                        <DialogClose asChild key={suggestion.value}>
                          <CommandItem
                            onSelect={() => {
                              setSearchQuery(suggestion.value);
                              setTimeout(() => {
                                const params = new URLSearchParams();
                                
                                if (["pizza", "burger", "sushi", "italian", "mexican", "chinese"].includes(suggestion.value)) {
                                  params.append("cuisine", suggestion.value);
                                } else {
                                  params.append("location", suggestion.value);
                                }
                                
                                navigate(`/restaurants?${params.toString()}`);
                                setIsCommandOpen(false);
                              }, 100);
                            }}
                          >
                            <Search className="mr-2 h-4 w-4" />
                            {suggestion.label}
                          </CommandItem>
                        </DialogClose>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DialogContent>
            </Dialog>
            
            {isAuthenticated ? (
              <>
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-SLIITery-orange text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarFallback className="bg-SLIITery-orange text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Hi, {user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/orders")}>
                      <History className="mr-2 h-4 w-4" />
                      <span>Order History</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Search and Menu */}
          {isMobile && (
            <div className="flex items-center space-x-2">
              {isSearchOpen ? (
                <div className="absolute inset-0 bg-background flex items-center px-4 z-10">
                  <form onSubmit={handleSearch} className="flex flex-1">
                    <Input
                      type="search"
                      placeholder="Search restaurants..."
                      className="flex-1 pl-10"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </form>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
              
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {isAuthenticated && (
                    <span className="absolute -top-1 -right-1 bg-SLIITery-orange text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      3
                    </span>
                  )}
                </Button>
              </Link>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-6 mt-8">
                    {isAuthenticated && (
                      <div className="pb-4 mb-2 border-b">
                        <p className="text-lg font-medium">Hi, {user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    )}
                    
                    <SheetClose asChild>
                      <Link to="/" className="flex items-center space-x-2">
                        <Home className="h-5 w-5" />
                        <span>Home</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/restaurants" className="flex items-center space-x-2">
                        <Search className="h-5 w-5" />
                        <span>Restaurants</span>
                      </Link>
                    </SheetClose>
                    
                    {isAuthenticated ? (
                      <>
                        <SheetClose asChild>
                          <Link to="/orders" className="flex items-center space-x-2">
                            <History className="h-5 w-5" />
                            <span>My Orders</span>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link to="/profile" className="flex items-center space-x-2">
                            <User className="h-5 w-5" />
                            <span>Account</span>
                          </Link>
                        </SheetClose>
                        <div className="pt-4 mt-auto">
                          <SheetClose asChild>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={handleLogout}
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              Logout
                            </Button>
                          </SheetClose>
                        </div>
                      </>
                    ) : (
                      <>
                        <SheetClose asChild>
                          <Link to="/login" className="flex items-center space-x-2">
                            <LogIn className="h-5 w-5" />
                            <span>Log in</span>
                          </Link>
                        </SheetClose>
                        <div className="pt-4">
                          <SheetClose asChild>
                            <Link to="/signup">
                              <Button className="w-full">Sign up</Button>
                            </Link>
                          </SheetClose>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
