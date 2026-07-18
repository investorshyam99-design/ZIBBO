const fs = require('fs');
let code = fs.readFileSync('src/AppContext.tsx', 'utf8');

// replace Cart Listener
code = code.replace(
  /\/\/ Cart Listener[\s\S]*?}, \[user, products\]\);/m,
  `// Cart Listener
  useEffect(() => {
    const savedCart = localStorage.getItem('zibbo_cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // re-hydrate with actual products
        const validCart = parsed.map((item: any) => {
          const product = products.find(p => p.id === item.productId);
          return product ? { product, quantity: item.quantity } : null;
        }).filter(Boolean);
        setCart(validCart);
      } catch (e) {}
    }
  }, [products]);
  
  // Sync cart to local storage
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('zibbo_cart', JSON.stringify(cart.map(item => ({ productId: item.product.id, quantity: item.quantity }))));
    }
  }, [cart, products]);`
);

// replace addToCart
code = code.replace(
  /const addToCart = async \([\s\S]*?  };/m,
  `const addToCart = async (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { product, quantity }];
    });
    setIsCartDrawerOpen(true);
  };`
);

// replace removeFromCart
code = code.replace(
  /const removeFromCart = async \([\s\S]*?  };/m,
  `const removeFromCart = async (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };`
);

// replace updateQuantity
code = code.replace(
  /const updateQuantity = async \([\s\S]*?  };/m,
  `const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };`
);

// replace clearCart
code = code.replace(
  /const clearCart = async \([\s\S]*?  };/m,
  `const clearCart = async () => {
    setCart([]);
  };`
);

// replace toggleWishlist
code = code.replace(
  /const toggleWishlist = async \([\s\S]*?  };/m,
  `const toggleWishlist = async (productId: string) => {
    setWishlist(prev => {
      const newWishlist = prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId];
      localStorage.setItem('zibbo_wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });
  };`
);

// initialize wishlist from localStorage
code = code.replace(
  /const \[wishlist, setWishlist\] = useState<string\[\]>\(\[\]\);/,
  `const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('zibbo_wishlist');
    return saved ? JSON.parse(saved) : [];
  });`
);

// replace addOrder to not require user
code = code.replace(
  "    if (!user) return;\n    const orderRef = doc(collection(db, 'orders'));",
  "    const orderRef = doc(collection(db, 'orders'));"
);
code = code.replace(
  "        userId: user.uid,",
  "        userId: user ? user.uid : 'guest',"
);

fs.writeFileSync('src/AppContext.tsx', code);
