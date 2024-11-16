import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image.png';
import bg from '../assets/Kawach.jpg';

const HeroSection = () => {
  const [isListening, setIsListening] = useState(false);
  const [promptCount, setPromptCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let speechSynthesis;
    let recognition;

    if (isListening) {
      if (promptCount < 2) {
        speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance("Speak: Ambulance");
        speechSynthesis.speak(utterance);

        utterance.onend = () => {
          setPromptCount(prevCount => prevCount + 1);
        };
      } else {
        recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          if (transcript.includes('ambulance')) {
            navigate('/sos');
          }
        };

        recognition.start();
      }
    }
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
      if (recognition) {
        recognition.stop();
      }
    };

  }, [isListening, promptCount, navigate]);

  const handleSOSClick = () => {
    setIsListening(true);
    setPromptCount(0);
  };

  return (
    <motion.div 
      className="relative h-screen pt-[30px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="relative z-10 flex flex-col items-center pt-[110px]"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
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
