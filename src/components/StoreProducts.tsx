import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../AppContext';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';

export default function StoreProducts() {
  const { navigate, addToCart } = useAppContext();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
        const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

        if (!domain || domain === 'your-store.myshopify.com') {
          setError('Please configure your Store Domain in the environment variables.');
          setLoading(false);
          return;
        }

        domain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

        const query = `
          {
            products(first: 20) {
              edges {
                node {
                  id
                  title
                  handle
                  images(first: 1) {
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

        const formattedProducts = json.data.products.edges.map(({ node }: any) => {
          const shopifyPrice = parseFloat(node.priceRange.minVariantPrice.amount);
          const originalPrice = (shopifyPrice * 2) + 1;

          return {
            id: node.id,
            name: node.title,
            price: shopifyPrice,
            originalPrice: originalPrice,
            image: node.images.edges[0]?.node.url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
            category: 'Premium Gadget',
            rating: 4.8,
            reviews: Math.floor(Math.random() * 500) + 50,
            description: 'Premium quality product.',
            badges: ['Trending']
          };
        });

        setProducts(formattedProducts);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-12 h-12 border-4 border-brand-navy border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-brand-navy font-bold tracking-widest uppercase text-xs">Loading Products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 text-center px-4 max-w-2xl mx-auto">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100">
          <h3 className="font-bold mb-2">Setup Required</h3>
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-4 text-red-500 font-medium">Please add VITE_SHOPIFY_STORE_DOMAIN to your secrets/env variables.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-brand-navy mb-3">Our Collection</h2>
            <p className="text-gray-500 text-sm max-w-md">Premium products directly from our store.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-hover bg-white rounded-xl overflow-hidden flex flex-col relative cursor-pointer border border-gray-100"
              onClick={() => {
                navigate('product', product.id, product as unknown as Product);
              }}
            >
              {/* Image */}
              <div className="aspect-[4/5] bg-gray-50 overflow-hidden relative group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product as unknown as Product, 1);
                    }}
                    className="w-full bg-white/90 backdrop-blur text-brand-navy font-bold text-xs uppercase tracking-widest py-3 rounded-lg shadow-lg hover:bg-brand-navy hover:text-white transition-colors flex items-center justify-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" /> Quick Add
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-5 flex-1 flex flex-col">
                <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                  {product.category}
                </div>
                
                <h3 className="font-bold text-brand-navy text-sm md:text-base leading-snug mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <div className="mt-auto pt-4 flex items-center justify-between">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-black text-brand-navy text-base md:text-lg">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-xs md:text-sm text-gray-400 line-through font-medium">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
