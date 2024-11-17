import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBars, FaHistory, FaChartLine, FaUser, FaMicrophone, FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const PrescriptionDisplay = () => {
  const navigate = useNavigate();
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [isPaid, setIsPaid] = useState(false);


  useEffect(() => {
    const data = localStorage.getItem('prescriptionData');
    if (data) {
      setPrescriptionData(JSON.parse(data));
    }
  }, []);

  const handlePayment = () => {
    setIsPaid(true);
    const updatedData = { ...prescriptionData, isPaid: true };
    localStorage.setItem('prescriptionData', JSON.stringify(updatedData));
    window.location.href = 'http://localhost:3001';
  };

  if (!prescriptionData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <h3 className="text-3xl font-bold mb-6 text-center text-white">Prescription Details</h3>
      
      <div className="bg-white bg-opacity-60 rounded-lg overflow-hidden shadow-lg">
      <div className="p-4 bg-gray-100">
  <div className="grid grid-cols-3 gap-4">
    <div>
      <p className="font-semibold">Patient: {prescriptionData.patientName}</p>
    </div>
    <div>
      <p className="font-semibold">Problem: {prescriptionData.problem}</p>
    </div>
    <div>
      <p className="font-semibold">Date: {new Date(prescriptionData.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })}</p>
    </div>
  </div>
</div>


        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left font-semibold">Medicine</th>
              <th className="p-4 text-left font-semibold">Dosage</th>
              <th className="p-4 text-left font-semibold">Duration</th>
            </tr>
          </thead>
          <tbody>
            {prescriptionData.medicines.map((medicine, index) => (
              <motion.tr 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-4">{medicine.name}</td>
                <td className="p-4">{medicine.dosage}</td>
                <td className="p-4">{medicine.course}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        <div className="p-4 bg-gray-100 flex justify-between items-center">
          <div>
            <p className="font-semibold">Doctor's Wallet:</p>
            <p className="font-mono text-sm">{prescriptionData.doctorWallet}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold">Consultation Fees:</p>
              <p className="text-xl font-bold">{prescriptionData.fees} ALPH</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              disabled={isPaid || prescriptionData.isPaid}
              className={`px-8 py-3 rounded-lg font-medium ${
                isPaid || prescriptionData.isPaid
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isPaid || prescriptionData.isPaid ? '✓ Paid' : 'Pay Now'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};



const PatientLandingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef (null);
  const [timer, setTimer] = useState(3600);
  const navigate = useNavigate(); 

  const [isListening, setIsListening] = useState(false);
  const [browserSupported, setBrowserSupported] = useState(true);
  
  useEffect(() => {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!SpeechRecognition) {
      setBrowserSupported(false);
      console.log("Speech recognition not supported");
    }
  }, []);

  const handleSOSClick = () => {
    if (!browserSupported) {
      alert('Please use Chrome browser for voice recognition');
      return;
    }
    setIsListening(true);
  };

  useEffect(() => {
    if (!isListening || !browserSupported) return;

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log('Listening started...');
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

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [isListening, browserSupported, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  return (
    <motion.div 
      className="relative min-h-screen w-full mt-[93px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-black bg-opacity-30 p-4 mt-[93px] flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars className="text-white text-2xl" />
        </motion.button>
        <motion.button
    className="bg-red-600 text-white text-xl px-10 py-2 rounded-full flex items-center"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={handleSOSClick}
  >
    <FaMicrophone className="mr-2" />
    SOS
  </motion.button>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)} />
      )}

      <motion.div 
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-100 mt-[93px] bg-black bg-opacity-90 z-50"
        variants={sidebarVariants}
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 text-white">
          <Link to="/appointment-history" className="flex items-center mb-8">
            <FaHistory className="mr-2" />
            Appointment History
          </Link>
          <Link to="/prediction" className="flex items-center mb-8">
            <FaChartLine className="mr-2" />
            Disease Predictions
          </Link>
          <Link to="/insurance" className="flex items-center mb-0">
            <FaChartLine className="mr-2" />
            Insurance
          </Link>
          <hr className="mt-[430px]" />
          <Link to="/user-profile" className="flex items-center mt-[10px]">
            <FaUser className="mr-2" />
            User Profile
          </Link>
        </div>
      </motion.div>
      <motion.h2 
          className="text-5xl font-bold text-white text-center mb-[20px] mt-[10px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
        Welcome to your Dashboard
        </motion.h2>
        <motion.h4 
          className="text-2xl font-normal text-white text-center mb-[80px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Manage your appoinments, documents and health history.
        </motion.h4>
      <motion.div 
        className="container mx-auto mt-8 p-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
  <div className="mb-8">
    <h3 className="text-3xl text-white font-semibold mb-2">Next Medicine In:</h3>
    <div className="flex justify-center space-x-4">
      {['Hours', 'Minutes', 'Seconds'].map((unit, index) => (
        <div key={unit} className="text-center">
          <p className="text-4xl font-bold text-white">
            {formatTime(timer).split(':')[index]}
          </p>
          <p className="text-sm text-gray-200">{unit}</p>
          
        </div>
        
      ))}
      
    </div>
    <h3 className="text-2xl mt-5 text-white font-normal mb-20">See Details</h3>
  </div>
</div>
<motion.div 
  className="container mx-auto mt-8 p-4"
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <PrescriptionDisplay />
</motion.div>

<motion.div 
  className="mx-auto w-[1300px] px-4"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h3 className="text-3xl font-bold mb-6 text-center text-white">Upcoming Appointments</h3>
  <motion.div 
    className="overflow-hidden rounded-lg shadow-lg"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    <table className="w-full bg-white bg-opacity-60">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-4 text-left font-semibold">Date</th>
          <th className="p-4 text-left font-semibold">Time</th>
          <th className="p-4 text-left font-semibold">Doctor</th>
          <th className="p-4 text-left font-semibold">Type</th>
        </tr>
      </thead>
      <tbody>
        <motion.tr 
          className="hover:bg-gray-50 transition-colors duration-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <td className="p-4">2023-09-15</td>
          <td className="p-4">10:00 AM</td>
          <td className="p-4">Dr. Smith</td>
          <td className="p-4">Check-up</td>
        </motion.tr>
        <motion.tr 
          className="hover:bg-gray-50 transition-colors duration-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <td className="p-4">2023-09-20</td>
          <td className="p-4">2:30 PM</td>
          <td className="p-4">Dr. Johnson</td>
          <td className="p-4">Follow-up</td>
        </motion.tr>
      </tbody>
    </table>
  </motion.div>
</motion.div>

      </motion.div>
    </motion.div>
  );
};

export default PatientLandingPage;
