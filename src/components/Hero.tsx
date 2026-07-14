import React from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../AppContext';

export default function Hero() {
  const { navigate } = useAppContext();
  
  return (
    <section className="relative w-full h-[calc(100vh-80px)] min-h-[500px] overflow-hidden bg-brand-navy">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        src="https://api-f.streamable.com/api/v1/videos/c50p4i/mp4"
      />
      <div className="absolute inset-0 bg-brand-navy/30"></div>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('home')}
          className="pill-btn bg-white text-brand-navy px-12 py-4 text-sm font-bold uppercase tracking-widest shadow-premium hover:bg-gray-50 transition-colors"
        >
          Shop Now
        </motion.button>
      </div>
    </section>
  );
}
