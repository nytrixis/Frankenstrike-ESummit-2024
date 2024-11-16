import React from 'react';
import { motion } from 'framer-motion';

interface InsuranceCardProps {
  plan: {
    name: string;
    price: string;
    features: string[];
    tokenAmount: string;
  };
  onSelect: () => void;
}

export const InsuranceCard: React.FC<InsuranceCardProps> = ({ plan, onSelect }) => {
  return (
    <motion.div
      className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 text-white"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
      <p className="text-3xl font-bold mb-6">{plan.price} ALPH</p>
      <ul className="mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="mb-2">✓ {feature}</li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Select Plan
      </button>
    </motion.div>
  );
};
