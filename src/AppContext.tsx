import { useNavigate } from 'react-router-dom';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from './types';

import { db, auth, OperationType, handleFirestoreError } from './firebase';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { collection, onSnapshot, query, setDoc, doc, deleteDoc, updateDoc, getDoc, getDocs, orderBy, where, serverTimestamp } from 'firebase/firestore';

export type ViewState = 'home' | 'product' | 'cart' | 'checkout' | 'admin' | 'search' | 'collections' | 'wishlist';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id?: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  mobile: string;
  address: string;
  productNames: string;
  items: CartItem[];
  quantity: number;
  paymentStatus: string;
  orderStatus: string;
  dateTime: string;
  total: number;
  status: string;
  createdAt: any;
}

interface AppContextType {
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  user: User | null;
  isAdmin: boolean;
  loadingAuth: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  currentView: ViewState;
  navigate: (view: ViewState, productId?: string, productObj?: Product) => void;
  selectedProductId: string | null;
  selectedProductObj: Product | null;
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Order) => Promise<void>;
  wishlist: string[];
  toggleWishlist: (productId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const routerNavigate = useNavigate();
  // Remove old routing states
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedProductObj, setSelectedProductObj] = useState<Product | null>(null);
  
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      const adminEmails = ['investorshyam99@gmail.com', 'admin@zibbo.com'];
      const isUserAdmin = currentUser ? adminEmails.includes(currentUser.email || '') : false;
      setIsAdmin(isUserAdmin);
      
      setLoadingAuth(false);
      
      // Auto-create user profile
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        getDoc(userRef).then(snap => {
          if (!snap.exists()) {
            setDoc(userRef, {
              email: currentUser.email || '',
              displayName: currentUser.displayName || '',
              photoURL: currentUser.photoURL || '',
              createdAt: serverTimestamp(),
              isAdmin: isUserAdmin
            }).catch(err => {
              console.error("Error creating user profile", err);
            });
          }
        });

        // Automatically redirect to admin dashboard if admin
        if (isUserAdmin) {
          setCurrentView('admin');
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Products Fetcher (Shopify)
  useEffect(() => {
    const fetchShopifyProducts = async () => {
      try {
        let domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
        const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

        if (!domain || domain === 'your-store.myshopify.com') {
          console.warn('Shopify domain not configured.');
          return;
        }

        domain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

        const query = `
          {
            products(first: 50) {
              edges {
                node {
                  id
                  title
                  handle
                  descriptionHtml
                  collections(first: 5) {
                    edges {
                      node {
                        title
                      }
                    }
                  }
                  variants(first: 5) {
                    edges {
                      node {
                        id
                        title
                        price {
                          amount
                        }
                      }
                    }
                  }
                  media(first: 5) {
                    edges {
                      node {
                        ... on MediaImage {
                          image {
                            url
                          }
                        }
                        ... on Video {
                          sources {
                            url
                            mimeType
                          }
                        }
                      }
                    }
                  }
                  images(first: 5) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        `;

        const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': token,
          },
          body: JSON.stringify({ query })
        });

        const json = await response.json();
        
        if (json.errors) {
          throw new Error(json.errors[0].message);
        }

        const badges = ['🔥 Trending', '⭐ Best Seller', '⚡ Must Have', '⏳ Limited Stock', '❤️ Customer Favourite', '🚀 Selling Fast', '✨ New Arrival'];

        const formattedProducts = json.data.products.edges.map(({ node }: any) => {
          const shopifyPrice = parseFloat(node.priceRange.minVariantPrice.amount);
          const originalPrice = shopifyPrice > 0 ? (shopifyPrice * 2) + 1 : 0;
          
          // Truly random badge per page load
          const randomBadgeIndex = Math.floor(Math.random() * badges.length);

          return {
            id: String(node.id).split('/').pop() || String(node.id),
            name: node.title,
            price: shopifyPrice,
            originalPrice: originalPrice,
            image: node.images.edges[0]?.node.url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
            images: node.images.edges.map((e: any) => e.node.url),
            category: node.productType || 'Product',
            rating: parseFloat((Math.random() * (4.9 - 4.0) + 4.0).toFixed(1)),
            reviews: Math.floor(Math.random() * (199 - 50 + 1)) + 50,
            description: 'Premium quality product meticulously designed for your everyday needs.',
            badges: [badges[randomBadgeIndex]],
            isNew: Math.random() > 0.5,
            stock: 999
          };
        });

        
        
        setProducts(formattedProducts);

      } catch (err) {
        console.error('Failed to fetch Shopify products', err);
      }
    };

    fetchShopifyProducts();
  }, []);

  // Cart Listener
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }
    const q = query(collection(db, `users/${user.uid}/cart`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cartItems: CartItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const product = products.find(p => p.id === data.productId);
        if (product) {
          cartItems.push({ product, quantity: data.quantity });
        }
      });
      setCart(cartItems);
    }, (error) => handleFirestoreError(error, OperationType.GET, `users/${user.uid}/cart`));
    return () => unsubscribe();
  }, [user, products]);

  // Wishlist Listener
  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }
    const q = query(collection(db, `users/${user.uid}/wishlist`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: string[] = [];
      snapshot.forEach((docSnap) => {
        items.push(docSnap.data().productId);
      });
      setWishlist(items);
    }, (error) => handleFirestoreError(error, OperationType.GET, `users/${user.uid}/wishlist`));
    return () => unsubscribe();
  }, [user]);

  // Orders Listener
  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }
    const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ords: Order[] = [];
      snapshot.forEach((docSnap) => {
        ords.push({ id: docSnap.id, ...docSnap.data() } as Order);
      });
      setOrders(ords.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt || 0);
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt || 0);
        return timeB - timeA;
      }));
    }, (error) => handleFirestoreError(error, OperationType.GET, 'orders'));
    return () => unsubscribe();
  }, [user]);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      if (err.code === 'auth/cancelled-popup-request' || err.code === 'auth/popup-closed-by-user') {
        console.warn('Login popup closed by user');
      } else {
        console.error(err);
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCart([]);
    setOrders([]);
  };

  const navigate = (view: ViewState, productId?: string, productObj?: Product) => {
    setCurrentView(view);
    if (productId) setSelectedProductId(productId);
    if (productObj) setSelectedProductObj(productObj);
    
    if (view === 'home') routerNavigate('/');
    else if (view === 'product' && productId) routerNavigate('/product/' + productId);
    else routerNavigate('/' + view);
    
    window.scrollTo(0, 0);
  };

  const addToCart = async (product: Product, quantity: number) => {
    if (!user) {
      alert("Please login to add items to your cart.");
      login();
      return;
    }
    const existing = cart.find(item => item.product.id === product.id);
    const cartRef = doc(db, `users/${user.uid}/cart`, product.id);
    
    try {
      if (existing) {
        await updateDoc(cartRef, {
          quantity: existing.quantity + quantity,
          addedAt: serverTimestamp(),
        });
      } else {
        await setDoc(cartRef, {
          productId: product.id,
          quantity,
          addedAt: serverTimestamp(),
        });
      }
      setIsCartDrawerOpen(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/cart/${product.id}`);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, `users/${user.uid}/cart`, productId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `users/${user.uid}/cart/${productId}`);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) return;
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    try {
      await updateDoc(doc(db, `users/${user.uid}/cart`, productId), {
        quantity,
        addedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}/cart/${productId}`);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      for (const item of cart) {
        await deleteDoc(doc(db, `users/${user.uid}/cart`, item.product.id));
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `users/${user.uid}/cart`);
    }
  };

  const toggleWishlist = async (productId: string) => {
    if (!user) {
      alert("Please login to manage your wishlist.");
      login();
      return;
    }
    const isWished = wishlist.includes(productId);
    const itemRef = doc(db, `users/${user.uid}/wishlist`, productId);
    try {
      if (isWished) {
        await deleteDoc(itemRef);
      } else {
        await setDoc(itemRef, { productId, addedAt: serverTimestamp() });
      }
    } catch (error) {
      handleFirestoreError(error, isWished ? OperationType.DELETE : OperationType.WRITE, `users/${user.uid}/wishlist/${productId}`);
    }
  };

  const addOrder = async (order: Order) => {
    if (!user) return;
    const orderRef = doc(collection(db, 'orders'));
    try {
      await setDoc(orderRef, {
        ...order,
        userId: user.uid,
        status: 'Processing',
        createdAt: serverTimestamp()
      });
      await clearCart();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'orders');
    }
  };

  return (
    <AppContext.Provider value={{
      isCartDrawerOpen,
      setIsCartDrawerOpen, 
      user, isAdmin, loadingAuth, login, logout, 
      currentView, navigate, selectedProductId, selectedProductObj, 
      products, cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      orders, addOrder, wishlist, toggleWishlist 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
