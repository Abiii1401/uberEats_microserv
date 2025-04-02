
import React from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedRestaurants from "@/components/home/FeaturedRestaurants";
import CuisineCategories from "@/components/home/CuisineCategories";
import AppCTA from "@/components/home/AppCTA";
import WelcomeBanner from "@/components/home/WelcomeBanner";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <div className="container-custom py-8">
        <WelcomeBanner />
        <FeaturedRestaurants />
        <CuisineCategories />
      </div>
      <AppCTA />
    </Layout>
  );
};

export default Index;
