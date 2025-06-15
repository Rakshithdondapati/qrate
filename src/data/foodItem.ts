// data/foodItems.ts
export const foodItems = [
  {
    id: 1,
    name: 'Chicken Biryani',
    description: '18 mins • Spicy • 4.5 ★ • 2 serves',
    price: 280,
    veg: false,
    spicy: true,
    time: 18,
    rating: 4.5,
    details: {
      ingredients: ['Basmati rice', 'Chicken', 'Onions', 'Tomatoes', 'Yogurt', 'Ginger', 'Garlic', 'Biryani masala', 'Mint', 'Coriander'],
      allergens: ['Dairy', 'Spices'],
      preparation: 'Cook rice and marinate chicken with spices. Layer rice and chicken, cook on low flame.',
      nutrition: { calories: '520 kcal', protein: '25g', carbs: '60g', fat: '18g' },
    },
  },
  {
    id: 2,
    name: 'Paneer Tikka',
    description: '15 mins • Mild • 4.7 ★ • 1 serve',
    price: 240,
    veg: true,
    spicy: false,
    time: 15,
    rating: 4.7,
    details: {
      ingredients: ['Paneer', 'Yogurt', 'Spices', 'Capsicum', 'Onions'],
      allergens: ['Dairy'],
      preparation: 'Marinate paneer in yogurt-spice mix, grill until golden.',
      nutrition: { calories: '430 kcal', protein: '18g', carbs: '10g', fat: '35g' },
    },
  },
  // You can add more items as needed
];
