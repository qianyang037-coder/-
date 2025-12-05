import React from 'react';
import { Dish } from '../types';
import { Heart, Utensils, Flame, Calendar, Info } from 'lucide-react';

interface DishDetailsProps {
  dish: Dish;
  onOrder: (dish: Dish) => void;
}

export const DishDetails: React.FC<DishDetailsProps> = ({ dish, onOrder }) => {
  const today = new Date().toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col h-full justify-center max-w-xl mx-auto p-8 animate-fade-in">
      {/* Breadcrumb / Metadata */}
      <div className="text-xs font-medium tracking-widest text-gray-500 mb-6 uppercase flex items-center gap-2">
         <span>{today}</span>
         <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
         <span className="text-love-red">{dish.type}</span>
      </div>

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-serif text-charcoal mb-4 leading-tight">
        {dish.name}
      </h1>

      {/* Mood Badge */}
      <div className="mb-8">
        <span className="inline-block px-3 py-1 border border-gray-300 rounded-full text-xs font-medium text-gray-600 uppercase tracking-wide">
          心情: {dish.mood}
        </span>
      </div>

      {/* Price & Action */}
      <div className="flex items-center gap-6 mb-12">
        <button 
          onClick={() => onOrder(dish)}
          className="bg-black text-white px-8 py-4 text-sm font-medium hover:bg-love-red transition-colors duration-300 flex items-center gap-2"
        >
          立即点餐
          <span className="ml-2 text-gray-400">|</span>
          <span>{dish.priceInKisses} 个吻</span>
        </button>
      </div>

      {/* Details List */}
      <div className="border-t border-gray-200 pt-8 space-y-6">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="font-medium text-gray-900">美味详情</div>
          <div className="col-span-2 text-gray-600 leading-relaxed font-serif italic">
            "{dish.description}"
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="font-medium text-gray-900 flex items-center gap-2">
            <Utensils size={14} /> 食材清单
          </div>
          <div className="col-span-2 text-gray-600">
            {dish.ingredients.join(', ')}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="font-medium text-gray-900 flex items-center gap-2">
            <Flame size={14} /> 热量
          </div>
          <div className="col-span-2 text-gray-600">
            {dish.calories} 卡路里
          </div>
        </div>
      </div>
    </div>
  );
};
