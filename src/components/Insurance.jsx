// src/components/insurance/InsurancePlans.jsx
import React from 'react';
import { motion } from 'framer-motion';
import PatientBg from './PatientBg';
import { FaShieldAlt, FaHospital, FaUserMd, FaPrescription, FaGlobe, FaHeartbeat } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';


const ConfirmationModal = ({ isOpen, onClose, plan }) => {
    const [recipientAddress, setRecipientAddress] = useState('');
    const placeholderAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('insuranceData', JSON.stringify({
            recipientAddress: recipientAddress,
            amount: plan.price
        }));
        window.location.href = 'http://localhost:3001';
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Confirm Your Plan</h2>

                        <div className="space-y-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-900">{plan.name}</h3>
                                <p className="text-blue-700">{plan.price} ALPH/month</p>
                                <p className="text-blue-600">Coverage: ₹{plan.coverage.toLocaleString()}</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Recipient Address
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={placeholderAddress}
                                        value={recipientAddress}
                                        onChange={(e) => setRecipientAddress(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSubmit}
                                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg"
                                >
                                    Confirm Purchase
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const PlanCard = ({ plan }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-white text-gray-800 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all"
            >
                Get Started
            </motion.button>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                plan={plan}
            />
        </>
    );
};

const plans = [
    {
        id: 1,
        name: "Essential Care",
        price: 3,
        coverage: 500000,
        features: [
            { text: "Basic Medical Coverage", icon: <FaShieldAlt /> },
            { text: "Emergency Services", icon: <FaHospital /> },
            { text: "General Physician Visits", icon: <FaUserMd /> },
            { text: "Basic Health Checkups", icon: <FaHeartbeat /> }
        ],
        color: "from-blue-500 to-blue-600"
    },
    {
        id: 2,
        name: "Premium Care",
        price: 299,
        coverage: 1000000,
        features: [
            { text: "Full Medical Coverage", icon: <FaHeartbeat /> },
            { text: "Specialist Consultations", icon: <FaUserMd /> },
            { text: "Prescription Coverage", icon: <FaPrescription /> },
            { text: "24/7 Medical Support", icon: <FaHospital /> }
        ],
        color: "from-purple-500 to-purple-600",
        popular: true
    },
    {
        id: 3,
        name: "Ultimate Care",
        price: 599,
        coverage: 2500000,
        features: [
            { text: "Global Coverage", icon: <FaGlobe /> },
            { text: "All Premium Features", icon: <FaHeartbeat /> },
            { text: "Priority Treatment", icon: <FaHospital /> },
            { text: "Personal Health Advisor", icon: <FaUserMd /> }
        ],
        color: "from-emerald-500 to-emerald-600"
    }
];


const InsurancePlans = () => {
    return (
        <PatientBg>
            <div className="min-h-screen pt-24 px-8 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-bold text-white mb-4 mt-6">
                        Choose Your Health Insurance Plan
                    </h1>
                    <p className="text-xl text-gray-300">
                        Protect your health with our comprehensive coverage options
                    </p>
                </motion.div>

                <div className="flex justify-center gap-8 px-4 flex-wrap">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="w-full md:w-96 relative"
                        >
                            <div className={`bg-gradient-to-br ${plan.color} rounded-2xl p-8 shadow-xl`}>
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 bg-yellow-400 text-black font-semibold px-4 py-1 rounded-tr-2xl rounded-bl-2xl">
                                        Popular
                                    </div>
                                )}
                                
                                <h2 className="text-2xl font-bold text-white mb-4">{plan.name}</h2>
                                <div className="mb-6">
    <span className="text-4xl font-bold text-white">{plan.price}</span>
    <span className="text-white opacity-80"> ALPH/month</span>
</div>
                                
<div className="bg-white bg-opacity-20 rounded-xl p-4 mb-6">
    <p className="text-white text-sm">Total Coverage</p>
    <p className="text-2xl font-bold text-white">
    ₹{plan.coverage.toLocaleString()}
    </p>
</div>

                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.2 + idx * 0.1 }}
                                            className="flex items-center text-white"
                                        >
                                            <span className="mr-3">{feature.icon}</span>
                                            {feature.text}
                                        </motion.div>
                                    ))}
                                </div>

                                <PlanCard plan={plan} />

                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </PatientBg>
    );
};

export default InsurancePlans;
