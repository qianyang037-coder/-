import React from 'react';
import { Dish } from '../types';

interface DishDisplayProps {
  dish: Dish;
  isActive: boolean;
}

export const DishDisplay: React.FC<DishDisplayProps> = ({ dish, isActive }) => {
  return (
    <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
      <img 
        src={dish.image} 
        alt={dish.name} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/10"></div>
    </div>
  );
};
