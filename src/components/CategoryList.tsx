import React from 'react';
import { motion } from 'motion/react';
import { categories } from '../data';

export default function CategoryList() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-brand-navy mb-4">Shop by Category</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm">Explore our curated collections of premium gadgets and lifestyle products.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.a
              href="#"
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col items-center cursor-pointer"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-50">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
              <h3 className="font-medium text-brand-navy text-center group-hover:text-gray-600 transition-colors">
                {category.name}
              </h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
