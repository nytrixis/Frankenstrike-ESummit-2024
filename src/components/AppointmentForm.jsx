import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaLanguage } from 'react-icons/fa';
import axios from 'axios';  // Import axios

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    symptoms: '',
    duration: '',
    previousTreatment: '',
    medications: '',
  });
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post form data to the backend API
      await axios.post('http://localhost:3000/api/appointments', formData);
      
      // Show success message
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } catch (error) {
      console.error('Error sending appointment request:', error);
      setShowMessage(false); // Hide message on error
    }
  };

  const handlePredictDisease = () => {
    navigate('/prediction', { state: { symptoms: formData.symptoms } });
  };

  return (
    <motion.div
      className="container mx-auto mt-[93px] p-6 max-w-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-white">Appointment Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded"
          required
        />
        <div className="flex space-x-4">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-1/2 p-2 rounded"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-1/2 p-2 rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <textarea
          name="symptoms"
          placeholder="Describe your symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          className="w-full p-2 rounded h-32"
          required
        />
        <input
          type="text"
          name="duration"
          placeholder="How long have you been experiencing this issue?"
          value={formData.duration}
          onChange={handleChange}
          className="w-full p-2 rounded"
          required
        />
        <textarea
          name="medications"
          placeholder="Current medications (if any)"
          value={formData.medications}
          onChange={handleChange}
          className="w-full p-2 rounded h-24"
        />
        <div className="flex justify-between">
          <motion.button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Appointment
          </motion.button>
          <motion.button
            type="button"
            onClick={handlePredictDisease}
            className="bg-accent text-white px-6 py-2 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Predict Disease
          </motion.button>
        </div>
      </form>
      {showMessage && (
        <motion.div
          className="mt-4 p-2 bg-green-100 text-green-700 rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          You'll be notified when the doctor accepts your request.
        </motion.div>
      )}
      <motion.button
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaLanguage size={50} />
      </motion.button>
    </motion.div>
  );
};

export default AppointmentForm;
