import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';

interface ProductSectionProps {
  title: string;
  description?: string;
  products: Product[];
  bgColor?: string;
}

export default function ProductSection({ title, description, products, bgColor = "bg-brand-offwhite" }: ProductSectionProps) {
  return (
    <section className={`py-20 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-brand-navy">{title}</h2>
            {description && (
              <p className="text-gray-500 text-sm mt-2">{description}</p>
            )}
          </div>
          <a href="#" className="hidden md:block text-xs font-bold uppercase tracking-widest underline underline-offset-4 text-brand-navy hover:opacity-70 transition-opacity">
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <a href="#" className="inline-block text-xs font-bold uppercase tracking-widest underline underline-offset-4 text-brand-navy hover:opacity-70 transition-opacity">
            View All Collection
          </a>
        </div>
      </div>
    </section>
  );
}
