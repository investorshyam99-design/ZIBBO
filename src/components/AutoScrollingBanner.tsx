import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimationFrame } from 'motion/react';
import { useAppContext } from '../AppContext';

export default function AutoScrollingBanner() {
  const { products, navigate } = useAppContext();
  const scrollerRef = useRef<HTMLDivElement>(null);

  // We want to duplicate the products a few times to ensure infinite scroll
  // But we'll just animate a container continuously
  const baseVelocity = -1;
  const directionFactor = useRef<number>(1);
  const x = useRef(0);

  // Filter products to those that have images
  const bannerProducts = products.filter(p => p.image);

  useAnimationFrame((t, delta) => {
    if (bannerProducts.length === 0) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 16);

    if (scrollerRef.current) {
      x.current += moveBy;
      
      // Reset if we've scrolled half the content (assuming we duplicated it)
      // A simpler approach for infinite scroll without framer-motion's complex hooks:
      const totalWidth = scrollerRef.current.scrollWidth / 2;
      
      if (Math.abs(x.current) >= totalWidth) {
        x.current = 0;
      }
      
      scrollerRef.current.style.transform = `translate3d(${x.current}px, 0, 0)`;
    }
  });

  if (bannerProducts.length === 0) return null;

  return (
    <div className="w-full bg-white py-4 md:py-6 overflow-hidden">
      <div 
        className="flex gap-4 md:gap-6 px-4 md:px-6 w-max cursor-grab active:cursor-grabbing hover:[animation-play-state:paused]"
        ref={scrollerRef}
        onMouseEnter={() => (directionFactor.current = 0)}
        onMouseLeave={() => (directionFactor.current = 1)}
        onTouchStart={() => (directionFactor.current = 0)}
        onTouchEnd={() => (directionFactor.current = 1)}
      >
        {/* Duplicate the array to create the infinite effect */}
        {[...bannerProducts, ...bannerProducts, ...bannerProducts].map((product, idx) => (
          <div 
            key={`${product.id}-${idx}`}
            className="flex-none w-[160px] h-[200px] md:w-[240px] md:h-[300px] rounded-2xl overflow-hidden shadow-sm relative group cursor-pointer"
            onClick={() => navigate('product', product.id)}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="text-white text-sm font-bold line-clamp-1">{product.name}</h3>
              <p className="text-white/90 text-xs font-semibold mt-1">₹{product.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
