
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const WelcomeBanner = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <div className="bg-nomnom-orange/10 border-l-4 border-nomnom-orange p-4 mb-6 rounded-r">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-medium text-foreground">
            Welcome back, {user?.name}! 
          </h3>
          <p className="text-muted-foreground">
            Ready to discover delicious meals for today?
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <span className="text-sm font-medium bg-nomnom-orange text-white px-3 py-1 rounded-full">
            Hungry?
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
