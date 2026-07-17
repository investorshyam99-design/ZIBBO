import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './AppContext';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import LivePurchasePopup from './components/LivePurchasePopup';
import CartDrawer from './components/CartDrawer';

import HomeView from './views/HomeView';
import ProductView from './views/ProductView';
import CartView from './views/CartView';
import CheckoutView from './views/CheckoutView';
import AdminView from './views/AdminView';
import CollectionsView from './views/CollectionsView';
import WishlistView from './views/WishlistView';
import SearchView from './views/SearchView';
import TrackOrderView from './views/TrackOrderView';
import ContactView from './views/ContactView';
import AboutView from './views/AboutView';
import FaqView from './views/FaqView';
import ShippingPolicyView from './views/ShippingPolicyView';
import RefundPolicyView from './views/RefundPolicyView';
import PrivacyPolicyView from './views/PrivacyPolicyView';
import TermsView from './views/TermsView';


export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppProvider>
          <div className="min-h-screen bg-brand-offwhite flex flex-col relative pb-16 md:pb-0">
            <div className="sticky top-0 z-50 flex flex-col w-full shadow-sm">
              <AnnouncementBar />
              <Header />
            </div>
            <div className="flex-1 w-full">
               <Routes>
                 <Route path="/" element={<HomeView />} />
                 <Route path="/product/:id" element={<ProductView />} />
                 <Route path="/cart" element={<CartView />} />
                 <Route path="/checkout" element={<CheckoutView />} />
                 <Route path="/admin" element={<AdminView />} />
                 <Route path="/collections" element={<CollectionsView />} />
                 <Route path="/collections/:id" element={<CollectionsView />} />
                 <Route path="/wishlist" element={<WishlistView />} />
                 <Route path="/search" element={<SearchView />} />
                 <Route path="/track-order" element={<TrackOrderView />} />
                 <Route path="/contact" element={<ContactView />} />
                 <Route path="/about" element={<AboutView />} />
                 <Route path="/faq" element={<FaqView />} />
                 <Route path="/shipping-policy" element={<ShippingPolicyView />} />
                 <Route path="/refund-policy" element={<RefundPolicyView />} />
                 <Route path="/privacy-policy" element={<PrivacyPolicyView />} />
                 <Route path="/terms" element={<TermsView />} />
               </Routes>
            </div>
            <Footer />
            <BottomNav />
            <LivePurchasePopup />
            <CartDrawer />
          </div>
        </AppProvider>
      </Router>
    </HelmetProvider>
  );
}
