/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useAppContext } from './AppContext';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Hero from './components/Hero';
import StoreProducts from './components/StoreProducts';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import LivePurchasePopup from './components/LivePurchasePopup';
import ProductView from './views/ProductView';
import CartView from './views/CartView';
import CheckoutView from './views/CheckoutView';
import AdminView from './views/AdminView';
import CollectionsView from './views/CollectionsView';
import WishlistView from './views/WishlistView';
import SearchView from './views/SearchView';
import SEO from './components/SEO';

function MainContent() {
  const { currentView } = useAppContext();

  if (currentView === 'product') return <ProductView />;
  if (currentView === 'cart') return <CartView />;
  if (currentView === 'checkout') return <CheckoutView />;
  if (currentView === 'admin') return <AdminView />;
  if (currentView === 'collections') return <CollectionsView />;
  if (currentView === 'wishlist') return <WishlistView />;
  if (currentView === 'search') return <SearchView />;

  // Default Home View
  return (
    <main>
      <SEO />
      <Hero />
      <StoreProducts />
    </main>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-brand-offwhite flex flex-col relative pb-16 md:pb-0">
        <div className="sticky top-0 z-50 flex flex-col w-full shadow-sm">
          <AnnouncementBar />
          <Header />
        </div>
        <div className="flex-1 w-full">
           <MainContent />
        </div>
        <Footer />
        <BottomNav />
        <LivePurchasePopup />
      </div>
    </AppProvider>
  );
}

