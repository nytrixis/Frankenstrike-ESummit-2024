import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { InsuranceCard } from './InsuranceCard';

const insurancePlans = [
  {
    id: 1,
    name: 'Basic Coverage',
    price: '1000',
    features: [
      'Basic medical coverage',
      'Emergency services',
      'Regular check-ups'
    ],
    tokenAmount: '1000'
  },
  {
    id: 2,
    name: 'Premium Coverage',
    price: '2000',
    features: [
      'Full medical coverage',
      'Specialist visits',
      'Prescription drugs',
      'Dental coverage'
    ],
    tokenAmount: '2000'
  },
  {
    id: 3,
    name: 'Comprehensive Coverage',
    price: '3000',
    features: [
      'Complete coverage',
      'International treatment',
      'Wellness programs',
      'Mental health support',
      'Alternative medicine'
    ],
    tokenAmount: '3000'
  }
];

const InsurancePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (plan: typeof insurancePlans[0]) => {
    navigate('/insurance/payment', { state: { plan } });
  };

  return (
    <div className="pt-[120px] px-8">
      <motion.h1 
        className="text-4xl font-bold text-white text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Choose Your Insurance Plan
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {insurancePlans.map((plan) => (
          <InsuranceCard 
            key={plan.id}
            plan={plan}
            onSelect={() => handleSelectPlan(plan)}
          />
        ))}
      </div>
    </div>
  );
};

export default InsurancePage;
