
import React from "react";
import Layout from "@/components/layout/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold mb-8">About NomNom</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              NomNom was founded in 2023 with a simple mission: to connect hungry people with delicious food from local restaurants, delivered fast and fresh to their doorstep.
            </p>
            <p className="text-muted-foreground mb-4">
              What started as a small operation in one city has quickly grown into a platform serving multiple locations, with thousands of restaurant partners and delivery drivers.
            </p>
            <p className="text-muted-foreground">
              We're passionate about food and technology, and we're constantly working to improve our service and expand our reach.
            </p>
          </div>
          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-4">
              To make food delivery accessible, affordable, and reliable for everyone while supporting local restaurants and creating flexible earning opportunities.
            </p>
            <h3 className="text-xl font-medium mt-6 mb-2">Values</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Customer satisfaction first</li>
              <li>Support local businesses</li>
              <li>Technology-driven efficiency</li>
              <li>Community engagement</li>
              <li>Sustainability and responsibility</li>
            </ul>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-nomnom-orange/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-nomnom-orange font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse</h3>
              <p className="text-muted-foreground">
                Browse restaurants and menus to find exactly what you're craving.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-nomnom-orange/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-nomnom-orange font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Order</h3>
              <p className="text-muted-foreground">
                Select your items, customize as needed, and check out securely.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-nomnom-orange/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-nomnom-orange font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy</h3>
              <p className="text-muted-foreground">
                Track your order in real-time and enjoy your food when it arrives.
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {name: "Sarah Johnson", role: "CEO & Co-founder", image: "https://randomuser.me/api/portraits/women/32.jpg"},
              {name: "Michael Chen", role: "CTO & Co-founder", image: "https://randomuser.me/api/portraits/men/44.jpg"},
              {name: "Priya Patel", role: "COO", image: "https://randomuser.me/api/portraits/women/68.jpg"},
              {name: "David Wilson", role: "Head of Marketing", image: "https://randomuser.me/api/portraits/men/22.jpg"}
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 mx-auto w-32 h-32 rounded-full overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
