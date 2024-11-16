import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image.png';
import bg from '../assets/Kawach.jpg';

const HeroSection = () => {
  const [isListening, setIsListening] = useState(false);
  const [browserSupported, setBrowserSupported] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!SpeechRecognition) {
      setBrowserSupported(false);
      console.log("Speech recognition not supported");
    }
  }, []);

  useEffect(() => {
    if (!isListening || !browserSupported) return;

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log('Listening started...');
      // Play audio prompt
      const speechSynthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance("Please say Ambulance");
      speechSynthesis.speak(utterance);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log('Heard:', transcript);
      if (transcript.includes('ambulance')) {
        navigate('/sos');
      }
    };

    recognition.onerror = (event) => {
      console.log('Error occurred:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log('Listening ended');
      setIsListening(false);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [isListening, browserSupported, navigate]);

  const handleSOSClick = () => {
    if (!browserSupported) {
      alert('Please use Chrome browser for voice recognition');
      return;
    }
    setIsListening(true);
  };

  // Rest of your JSX remains the same
  return (
    <motion.div 
      className="relative h-screen pt-[30px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Your existing motion.div components */}
      <motion.div 
        className="relative z-10 flex flex-col items-center pt-[110px]"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Logo section */}
        <motion.div 
          className="relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-black opacity-50 rounded-full transform translate-x-1 translate-y-3"></div>
          <div className="relative w-[310px] h-[310px] bg-white rounded-full flex items-center justify-center">
            <img src={logo} alt="Kawach Logo" className="w-[300px] h-[300px]" />
          </div>
        </motion.div>

        {/* Text content */}
        <motion.h1 
          className="text-3xl font-bold text-white mt-9"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Protecting Lives, Empowering Care
        </motion.h1>
        <motion.h2 
          className="text-2xl text-white mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          A secure platform for instant medical assistance
        </motion.h2>

        {/* SOS Button */}
        <motion.button 
          className="bg-red-600 text-white px-4 py-2 rounded mt-5 pl-5 flex flex-col items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-red-700"
          style={{ width: '250px', height: '80px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSOSClick}
        >
          <div className="flex items-center justify-center mb-1 pt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="font-bold text-2xl">SOS</span>
          </div>
          <span className="text-lg text-center">Speak: "Ambulance"</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
