import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, ShoppingBag, HandCoins, Laptop, PenTool, Gift } from 'lucide-react'
; // Replace with actual icon imports

export default function Option() {
  const navigate = useNavigate();
  const categories = [
    { name: "Food", icon: Utensils },
    { name: "Clothes", icon: ShoppingBag },
    { name: "Money", icon: HandCoins },
    { name: "Electronics", icon: Laptop },
    { name: "Stationary", icon: PenTool },
    { name: "Toys", icon: Gift },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold italic mb-8">What you wanna donate?</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <button
            key={category.name}
            className="p-8 border-2 border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors duration-200 flex flex-col items-center gap-3"
            onClick={() => navigate(`/donate/${category.name.toLowerCase()}`)}
          >
            <category.icon className="w-12 h-12 text-emerald-600" strokeWidth={1.5} />
            <span className="text-gray-800 font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}