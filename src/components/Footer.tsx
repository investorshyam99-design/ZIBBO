import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function Footer() {
  const { currentView } = useAppContext();
  if (currentView === 'cart' || currentView === 'checkout') return null;
  return (
    <footer className="bg-black pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-black tracking-tighter italic text-white inline-block mb-6">
              ZIBBO
            </Link>
            <p className="text-gray-400 mb-8 max-w-sm text-sm leading-relaxed">
              Elevating everyday living with aesthetic home decor, and trending viral products. Discover the extraordinary.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-6">Shop</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/collections" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/collections/best-sellers" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link to="/collections/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/collections/galaxy-projectors" className="hover:text-white transition-colors">Galaxy Projectors</Link></li>
              <li><Link to="/collections/smart-gadgets" className="hover:text-white transition-colors">Smart Gadgets</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-6">Support</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-6">About</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
            &copy; {new Date().getFullYear()} ZIBBO DTC INC.
          </p>
          <div className="flex items-center gap-4 text-gray-500">
            {/* Fake Payment Icons */}
            <div className="px-3 py-1 bg-gray-900 rounded border border-gray-800 text-xs font-medium text-gray-400">VISA</div>
            <div className="px-3 py-1 bg-gray-900 rounded border border-gray-800 text-xs font-medium text-gray-400">MC</div>
            <div className="px-3 py-1 bg-gray-900 rounded border border-gray-800 text-xs font-medium text-gray-400">AMEX</div>
            <div className="px-3 py-1 bg-gray-900 rounded border border-gray-800 text-xs font-medium text-gray-400">PAYPAL</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
