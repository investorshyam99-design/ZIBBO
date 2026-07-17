import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../AppContext';

const NAMES = ['Sam', 'Kiya', 'Kashish', 'Aarav', 'Vihaan', 'Reyansh', 'Ayaan', 'Kabir', 'Riyan', 'Aadhya', 'Anaya', 'Myra', 'Kiara', 'Aarohi', 'Siya', 'Ishaan', 'Vivaan', 'Rudra', 'Krish', 'Advik', 'Aryan', 'Tanish', 'Saanvi', 'Riya', 'Diya'];
const CITIES = ['Mumbai', 'Delhi', 'Noida', 'Pune', 'Nashik', 'Jalgaon', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Surat', 'Jaipur', 'Indore', 'Nagpur', 'Lucknow', 'Kolkata', 'Chennai'];

export default function LivePurchasePopup() {
  const { currentView, selectedProductObj, products, isCartDrawerOpen } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState<{
    name: string;
    city: string;
    time: number;
    image: string;
  } | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let hideTimeout: ReturnType<typeof setTimeout>;

    const showNotification = () => {
      // Pick random name, city, time
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const time = Math.floor(Math.random() * 30) + 1; // 1 to 30 mins
      
      // Determine image
      let image = '';
      if (currentView === 'product' && selectedProductObj) {
        image = selectedProductObj.image;
      } else if (products.length > 0) {
        image = products[Math.floor(Math.random() * products.length)].image;
      }

      if (image) {
        setNotification({ name, city, time, image });
        setIsVisible(true);

        // Auto hide after 5 seconds
        hideTimeout = setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      }
    };

    // Show first notification after a delay
    const initialDelay = setTimeout(() => {
      showNotification();
      
      // Then show every 30 seconds
      interval = setInterval(() => {
        showNotification();
      }, 40000);
    }, 5000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
      clearTimeout(hideTimeout);
    };
  }, [currentView, selectedProductObj, products]);

  if (isCartDrawerOpen || currentView === 'cart' || currentView === 'checkout') return null;

  return (
    <AnimatePresence>
      {isVisible && notification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-[130px] md:bottom-6 left-4 md:left-6 z-50 bg-white shadow-xl rounded-xl border border-gray-100 p-3 pr-10 flex items-center gap-4 max-w-sm"
        >
          <div className="relative shrink-0">
            <img src={notification.image} alt="Purchased product" className="w-12 h-12 object-cover rounded-md" />
            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full text-white">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-sm">
            <p className="text-brand-navy leading-tight">
              <span className="font-bold">{notification.name}</span> from <span className="font-bold">{notification.city}</span> bought this product
            </p>
            <p className="text-gray-500 text-xs mt-0.5">{notification.time} minutes ago</p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
