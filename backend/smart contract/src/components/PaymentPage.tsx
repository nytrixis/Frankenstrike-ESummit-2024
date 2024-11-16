import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWallet } from '@alephium/web3-react';
import { motion } from 'framer-motion';
// import { DOCTOR_ADDRESS } from '../constants/addresses';
import { transferTokens } from '../services/tokenService';

export const DOCTOR_ADDRESS = "15WvWB8qzHnqxWQu3ifAbv35ekBNWNBm2NnwwiDrCSekd"

const PaymentPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { signer, account } = useWallet();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handlePayment = async () => {
    if (!signer || !account || !state.plan) return;

    setIsProcessing(true);
    try {
      const result = await transferTokens(
        signer,
        DOCTOR_ADDRESS,
        state.plan.tokenAmount
      );
      
      if (result.txId) {
        // Wait for confirmation
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigate('/insurance/success');
      }
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-[120px] px-8">
      <motion.div 
        className="max-w-2xl mx-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h1 className="text-3xl font-bold text-white mb-8">Confirm Payment</h1>
        <div className="mb-8">
          <h2 className="text-xl text-white mb-4">Plan Details:</h2>
          <p className="text-white">Plan: {state?.plan?.name}</p>
          <p className="text-white">Amount: {state?.plan?.price} ALPH</p>
        </div>
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          {isProcessing ? 'Processing...' : 'Confirm Payment'}
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
