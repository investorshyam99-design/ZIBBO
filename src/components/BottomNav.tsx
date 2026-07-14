import React from 'react';
import { Home, Search, LayoutGrid, User, ShoppingBag } from 'lucide-react';
import { useAppContext, ViewState } from '../AppContext';

export default function BottomNav() {
  const { currentView, navigate, cart } = useAppContext();
  
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'collections', icon: LayoutGrid, label: 'Catalog' },
    { id: 'admin', icon: User, label: 'Account' },
    { id: 'cart', icon: ShoppingBag, label: 'Cart' }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 pb-safe">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button 
            key={item.id}
            onClick={() => navigate(item.id as ViewState)}
            className={`flex flex-col items-center space-y-1 relative ${isActive ? 'text-brand-navy' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[9px] font-bold tracking-wider uppercase">{item.label}</span>
            {item.id === 'cart' && cart.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-brand-navy text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cart.reduce((acc, c) => acc + c.quantity, 0)}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
