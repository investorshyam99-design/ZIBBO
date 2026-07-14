import React from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-24 bg-brand-offwhite">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 md:p-16 text-center shadow-premium border border-gray-100 relative overflow-hidden"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] -z-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-50 rounded-tr-[80px] -z-10"></div>

          <div className="w-16 h-16 bg-brand-navy/5 text-brand-navy rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-brand-navy mb-4">
            Join the ZIBBO Club
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto text-sm">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals delivered straight to your inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-6 py-3.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all text-sm"
              required
            />
            <button 
              type="submit"
              className="pill-btn bg-brand-navy text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:opacity-90 flex items-center justify-center group"
            >
              Subscribe
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4">By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
        </motion.div>
      </div>
    </section>
  );
}
