import { Dish } from './types';

export const INITIAL_DISHES: Dish[] = [
  {
    id: '1',
    name: '奶油蘑菇烩饭',
    image: 'https://picsum.photos/800/1200?random=1',
    type: '主菜',
    mood: '温馨 & 暖胃',
    ingredients: ['意大利米', '野蘑菇', '帕玛森芝士', '白葡萄酒', '百里香'],
    calories: 450,
    priceInKisses: 5,
    description: '一碗温暖的拥抱。用耐心和爱心慢炖而成，最适合我们一起度过的雨夜。'
  },
  {
    id: '2',
    name: '香煎三文鱼配芦笋',
    image: 'https://picsum.photos/800/1200?random=2',
    type: '健康晚餐',
    mood: '清新 & 轻盈',
    ingredients: ['大西洋三文鱼', '芦笋', '柠檬', '蒜香黄油', '莳萝'],
    calories: 380,
    priceInKisses: 8,
    description: '外皮酥脆，肉质鲜嫩。健康的选择，让我们有更多精力享受之后的时光。'
  },
  {
    id: '3',
    name: '熔岩巧克力蛋糕',
    image: 'https://picsum.photos/800/1200?random=3',
    type: '甜点',
    mood: '纵享 & 甜蜜',
    ingredients: ['黑巧克力', '黄油', '鸡蛋', '糖', '香草'],
    calories: 520,
    priceInKisses: 10,
    description: '内心深邃浓郁，就像我对你的爱一样，甜蜜流淌。'
  }
];

export const INITIAL_QUOTE = {
  text: "做饭就像去爱一个人，要么全心全意，要么就别开始。",
  author: "哈丽特·范·霍恩"
};
