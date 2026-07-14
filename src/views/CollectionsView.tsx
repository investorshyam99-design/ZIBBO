import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { products } from '../data';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import AnnouncementBar from '../components/AnnouncementBar';

export default function CollectionsView() {
  const { navigate, addToCart } = useAppContext();
  const [sortBy, setSortBy] = useState('featured');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  let displayProducts = [...products];
  if (filterCategory !== 'All') {
    displayProducts = displayProducts.filter(p => p.category === filterCategory);
  }

  if (sortBy === 'price-low') {
    displayProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    displayProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    displayProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  return (
    <div className="min-h-screen bg-brand-offwhite pb-20 md:pb-0">
      <AnnouncementBar />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-brand-navy mb-2">All Products</h1>
            <p className="text-gray-500 text-sm">Discover our entire premium collection.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white border border-gray-200 text-brand-navy text-sm rounded-lg focus:ring-brand-navy focus:border-brand-navy block w-full p-2.5 font-medium"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 text-brand-navy text-sm rounded-lg focus:ring-brand-navy focus:border-brand-navy block w-full p-2.5 font-medium"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {displayProducts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-gray-500 font-medium">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card-hover bg-white rounded-xl overflow-hidden flex flex-col relative cursor-pointer border border-gray-100"
                onClick={() => navigate('product', product.id)}
              >
                <div className="aspect-[4/5] bg-gray-50 overflow-hidden relative group">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className="w-full bg-white/90 backdrop-blur text-brand-navy font-bold text-xs uppercase tracking-widest py-3 rounded-lg shadow-lg hover:bg-brand-navy hover:text-white transition-colors flex items-center justify-center"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" /> Quick Add
                    </button>
                  </div>
                </div>

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
                      {product.originalPrice && (
                        <span className="text-xs md:text-sm text-gray-400 line-through font-medium">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
