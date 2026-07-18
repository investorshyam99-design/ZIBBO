import React from 'react';
import AutoScrollingBanner from '../components/AutoScrollingBanner';
import Features from '../components/Features';
import NewArrivals from '../components/NewArrivals';
import CustomerFavorites from '../components/CustomerFavorites';
import Stats from '../components/Stats';
import StoreProducts from '../components/StoreProducts';
import SEO from '../components/SEO';

export default function HomeView() {
  return (
    <main>
      <SEO 
        title="ZIBBO | Premium Products for Your Lifestyle"
        description="Discover trending and premium products at ZIBBO. Shop our curated collections."
        type="website"
      />
      <AutoScrollingBanner />
      <Features />
      <NewArrivals />
      <CustomerFavorites />
      <Stats />
      <StoreProducts />
    </main>
  );
}
