import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useAppContext } from '../AppContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { navigate } = useAppContext();
  
  return (
    <div 
      className="card-hover bg-brand-offwhite rounded-xl overflow-hidden flex flex-col relative cursor-pointer"
      onClick={() => navigate('product', product.id)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
        {product.isNew && (
          <span className="badge bg-white text-brand-navy shadow-sm">
            New
          </span>
        )}
        {product.badges?.map(badge => (
          <span key={badge} className="badge bg-white text-brand-navy shadow-sm">
            {badge}
          </span>
        ))}
      </div>

      {/* Image & Quick Actions */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 group">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Quick actions on hover */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-20">
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-navy shadow-lg hover:bg-brand-navy hover:text-white transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="flex-1 max-w-[160px] h-12 bg-brand-navy text-white rounded-full flex items-center justify-center font-medium shadow-lg hover:bg-black transition-colors">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-navy shadow-lg hover:bg-brand-navy hover:text-white transition-colors">
            <Eye className="w-5 h-5" />
          </button>
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold truncate text-brand-navy">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{product.category}</p>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center space-x-2">
            <span className="font-black text-sm text-brand-navy">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <div className="flex items-center text-[10px] font-bold text-brand-navy">
            <Star className="w-3 h-3 fill-brand-navy mr-1" />
            {product.rating} <span className="ml-1 text-gray-400 font-normal">({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
