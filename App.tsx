import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { DishDetails } from './components/DishDetails';
import { DishDisplay } from './components/DishDisplay';
import { AdminPanel } from './components/AdminPanel';
import { INITIAL_DISHES, INITIAL_QUOTE } from './constants';
import { Dish, DailyQuote } from './types';
import { Menu, ChevronDown, ChevronUp, Quote } from 'lucide-react';

const App = () => {
  const [dishes, setDishes] = useState<Dish[]>(INITIAL_DISHES);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [dailyQuote, setDailyQuote] = useState<DailyQuote>(INITIAL_QUOTE);
  const [isOrdering, setIsOrdering] = useState(false);

  // Wheel event to handle full-page scrolling interaction
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
        // Simple debounce could be added here for smoother experience
    };
    // For this implementation, we will use buttons for better control 
    // to avoid scroll-jacking issues common in browsers.
  }, []);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % dishes.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + dishes.length) % dishes.length);
  };

  const handleOrder = (dish: Dish) => {
    setIsOrdering(true);
    setTimeout(() => {
        alert(`💖 收到订单！ \n\n请立即向大厨支付 ${dish.priceInKisses} 个吻。`);
        setIsOrdering(false);
    }, 800);
  };

  if (dishes.length === 0) return <div>加载中...</div>;

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-soft-cream font-sans overflow-hidden">
      
      {/* 1. Left Panel - Images */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-gray-100">
        {dishes.map((dish, idx) => (
          <DishDisplay 
            key={dish.id} 
            dish={dish} 
            isActive={idx === currentIdx} 
          />
        ))}
        
        {/* Quote Overlay */}
        <div className="absolute bottom-8 left-8 right-8 z-20 text-white/90">
            <div className="bg-black/30 backdrop-blur-md p-6 rounded-lg border border-white/10 max-w-md">
                <Quote size={20} className="mb-2 opacity-80" />
                <p className="font-serif text-lg italic leading-relaxed mb-2">"{dailyQuote.text}"</p>
                {dailyQuote.author && <p className="text-xs uppercase tracking-widest opacity-70">- {dailyQuote.author}</p>}
            </div>
        </div>
      </div>

      {/* 2. Right Panel - Details */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-white flex flex-col">
        {/* Navigation Controls */}
        <div className="absolute top-0 right-0 p-6 flex items-center gap-4 z-20">
             <button 
                onClick={() => setIsAdminOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                title="管理菜单"
             >
                 <Menu size={20} />
             </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 relative overflow-hidden">
            <DishDetails 
                dish={dishes[currentIdx]} 
                onOrder={handleOrder} 
            />
        </div>

        {/* Footer Navigation (Sticky) */}
        <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-white">
            <div className="text-sm font-medium text-gray-400">
                {currentIdx + 1} / {dishes.length}
            </div>
            <div className="flex gap-2">
                <button 
                    onClick={handlePrev}
                    className="p-4 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300"
                >
                    <ChevronUp size={20} className="md:rotate-0 -rotate-90" />
                </button>
                <button 
                    onClick={handleNext}
                    className="p-4 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300"
                >
                    <ChevronDown size={20} className="md:rotate-0 -rotate-90" />
                </button>
            </div>
        </div>
      </div>

      {/* 3. Admin Modal */}
      {isAdminOpen && (
        <AdminPanel 
            dishes={dishes} 
            setDishes={setDishes} 
            quote={dailyQuote}
            setQuote={setDailyQuote}
            onClose={() => setIsAdminOpen(false)} 
        />
      )}
      
      {/* Ordering Overlay Feedback */}
      {isOrdering && (
        <div className="fixed inset-0 bg-black/20 z-50 backdrop-blur-sm flex items-center justify-center">
            <div className="animate-bounce text-6xl">💖</div>
        </div>
      )}
    </div>
  );
};

export default App;
