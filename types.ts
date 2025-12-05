export interface Dish {
  id: string;
  name: string;
  image: string;
  type: string; // e.g., "Dinner", "Dessert"
  mood: string; // e.g., "Cozy", "Romantic", "Energetic"
  ingredients: string[];
  calories: number;
  priceInKisses: number;
  description: string;
}

export interface DailyQuote {
  text: string;
  author?: string;
}
