import React, { useState } from 'react';
import { Dish, DailyQuote } from '../types';
import { X, Plus, Trash2, Wand2, Edit3, Save } from 'lucide-react';
import { generateLoveQuote } from '../services/geminiService';

interface AdminPanelProps {
  dishes: Dish[];
  setDishes: React.Dispatch<React.SetStateAction<Dish[]>>;
  quote: DailyQuote;
  setQuote: React.Dispatch<React.SetStateAction<DailyQuote>>;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ dishes, setDishes, quote, setQuote, onClose }) => {
  const [newDish, setNewDish] = useState<Partial<Dish>>({
    name: '', type: '', mood: '', ingredients: [], calories: 0, priceInKisses: 0, description: '', image: 'https://picsum.photos/800/1200'
  });
  const [isGeneratingQuote, setIsGeneratingQuote] = useState(false);
  const [editingQuote, setEditingQuote] = useState(false);
  const [tempQuoteText, setTempQuoteText] = useState(quote.text);

  const handleDelete = (id: string) => {
    if (confirm('确定要从菜单中移除这道菜吗？')) {
      setDishes(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleAddDish = () => {
    if (!newDish.name || !newDish.priceInKisses) return alert('菜品名称和价格是必填项！');
    
    const dish: Dish = {
      id: Date.now().toString(),
      name: newDish.name!,
      image: newDish.image || `https://picsum.photos/800/1200?random=${Date.now()}`,
      type: newDish.type || '特色菜',
      mood: newDish.mood || '开心',
      ingredients: typeof newDish.ingredients === 'string' ? (newDish.ingredients as string).split(',') : [],
      calories: Number(newDish.calories) || 0,
      priceInKisses: Number(newDish.priceInKisses) || 0,
      description: newDish.description || '用心制作。'
    };

    setDishes(prev => [...prev, dish]);
    setNewDish({ name: '', type: '', mood: '', ingredients: [], calories: 0, priceInKisses: 0, description: '', image: 'https://picsum.photos/800/1200' });
  };

  const handleGenerateQuote = async () => {
    setIsGeneratingQuote(true);
    const text = await generateLoveQuote();
    setTempQuoteText(text);
    setQuote({ ...quote, text });
    setIsGeneratingQuote(false);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-serif">后厨管理</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Quote Section */}
        <section className="mb-16 bg-soft-cream p-6 rounded-lg border border-stone-200">
            <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                <Edit3 size={18} /> 每日爱心语录
            </h3>
            
            <div className="flex gap-4 mb-4">
                <textarea 
                    value={tempQuoteText}
                    onChange={(e) => setTempQuoteText(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-love-red font-serif text-lg text-gray-700"
                    rows={2}
                />
            </div>
            
            <div className="flex gap-3">
                <button 
                    onClick={() => { setQuote({...quote, text: tempQuoteText}); alert('语录已更新！'); }}
                    className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm hover:bg-black transition"
                >
                    <Save size={16} /> 保存语录
                </button>
                <button 
                    onClick={handleGenerateQuote}
                    disabled={isGeneratingQuote}
                    className="flex items-center gap-2 px-4 py-2 border border-charcoal text-charcoal text-sm hover:bg-gray-50 transition"
                >
                    <Wand2 size={16} /> {isGeneratingQuote ? '正在询问爱神...' : 'AI 生成'}
                </button>
            </div>
        </section>

        {/* Add Dish Section */}
        <section className="mb-16">
          <h3 className="text-xl font-medium mb-6">添加新菜品</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
                placeholder="菜品名称" 
                className="p-3 border rounded"
                value={newDish.name} 
                onChange={e => setNewDish({...newDish, name: e.target.value})}
            />
            <input 
                placeholder="类型 (如：早餐)" 
                className="p-3 border rounded"
                value={newDish.type} 
                onChange={e => setNewDish({...newDish, type: e.target.value})}
            />
            <input 
                placeholder="心情 (如：温馨)" 
                className="p-3 border rounded"
                value={newDish.mood} 
                onChange={e => setNewDish({...newDish, mood: e.target.value})}
            />
            <div className="flex gap-4">
                <input 
                    placeholder="价格 (吻)" 
                    type="number"
                    className="p-3 border rounded w-1/2"
                    value={newDish.priceInKisses || ''} 
                    onChange={e => setNewDish({...newDish, priceInKisses: Number(e.target.value)})}
                />
                <input 
                    placeholder="热量 (卡路里)" 
                    type="number"
                    className="p-3 border rounded w-1/2"
                    value={newDish.calories || ''} 
                    onChange={e => setNewDish({...newDish, calories: Number(e.target.value)})}
                />
            </div>
            <textarea 
                placeholder="描述" 
                className="p-3 border rounded md:col-span-2"
                rows={2}
                value={newDish.description} 
                onChange={e => setNewDish({...newDish, description: e.target.value})}
            />
            <button onClick={handleAddDish} className="md:col-span-2 bg-love-red text-white py-3 rounded hover:bg-red-700 transition">
                添加到菜单
            </button>
          </div>
        </section>

        {/* Existing Dishes */}
        <section>
          <h3 className="text-xl font-medium mb-6">当前菜单</h3>
          <div className="grid grid-cols-1 gap-4">
            {dishes.map(dish => (
              <div key={dish.id} className="flex items-center justify-between p-4 border rounded bg-white hover:shadow-sm">
                <div className="flex items-center gap-4">
                  <img src={dish.image} className="w-16 h-16 object-cover rounded" alt={dish.name} />
                  <div>
                    <div className="font-medium">{dish.name}</div>
                    <div className="text-sm text-gray-500">{dish.priceInKisses} 个吻</div>
                  </div>
                </div>
                <button onClick={() => handleDelete(dish.id)} className="text-red-500 hover:text-red-700 p-2">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
