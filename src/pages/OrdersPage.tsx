
import React from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Utensils, Package, Clock, CheckCheck } from "lucide-react";

// Mock order history data
const MOCK_ORDERS = [
  {
    id: "ORD-1234",
    restaurant: "Burger Palace",
    items: [
      { name: "Classic Cheeseburger", quantity: 2 },
      { name: "Loaded Fries", quantity: 1 }
    ],
    total: 23.97,
    date: "2023-10-15T18:30:00",
    status: "Delivered"
  },
  {
    id: "ORD-1235",
    restaurant: "Pizza Haven",
    items: [
      { name: "Pepperoni Pizza", quantity: 1 },
      { name: "Garlic Knots", quantity: 1 }
    ],
    total: 19.49,
    date: "2023-10-10T19:15:00",
    status: "Delivered"
  },
  {
    id: "ORD-1236",
    restaurant: "Sushi Express",
    items: [
      { name: "California Roll", quantity: 1 },
      { name: "Miso Soup", quantity: 1 }
    ],
    total: 15.75,
    date: "2023-10-05T20:45:00",
    status: "Delivered"
  }
];

const OrdersPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Or a loading state
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCheck className="h-4 w-4" />;
      case "In Progress":
        return <Clock className="h-4 w-4" />;
      case "Preparing":
        return <Utensils className="h-4 w-4" />;
      case "Out for Delivery":
        return <Package className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        
        {MOCK_ORDERS.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-16 w-16 text-muted-foreground opacity-30" />
            <h2 className="mt-4 text-2xl font-medium">No orders yet</h2>
            <p className="mt-2 text-muted-foreground">
              You haven't placed any orders with us yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      Order #{order.id}
                    </CardTitle>
                    <Badge className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Restaurant</p>
                      <p>{order.restaurant}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Date</p>
                      <p>{formatDate(order.date)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Total</p>
                      <p>${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Items</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.quantity}x {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage;
