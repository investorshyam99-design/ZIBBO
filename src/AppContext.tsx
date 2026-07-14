import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from './types';

export type ViewState = 'home' | 'product' | 'cart' | 'checkout' | 'admin' | 'search' | 'collections';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  orderNumber: string;
  customerName: string;
  mobile: string;
  address: string;
  productNames: string;
  quantity: number;
  paymentStatus: string;
  orderStatus: string;
  dateTime: string;
}

interface AppContextType {
  currentView: ViewState;
  navigate: (view: ViewState, productId?: string, productObj?: Product) => void;
  selectedProductId: string | null;
  selectedProductObj: Product | null;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedProductObj, setSelectedProductObj] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const navigate = (view: ViewState, productId?: string, productObj?: Product) => {
    setCurrentView(view);
    if (productId) {
      setSelectedProductId(productId);
    }
    if (productObj) {
      setSelectedProductObj(productObj);
    }
    window.scrollTo(0, 0);
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <AppContext.Provider value={{ currentView, navigate, selectedProductId, selectedProductObj, cart, addToCart, removeFromCart, updateQuantity, clearCart, orders, addOrder }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
