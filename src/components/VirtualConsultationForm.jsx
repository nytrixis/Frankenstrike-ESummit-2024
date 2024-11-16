import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLanguage } from 'react-icons/fa';
import axios from 'axios'; // Import axios for making API requests

const VirtualConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    problem: '',
    duration: '',
    previousTreatment: '',
    medications: '',
  });
  const [showMessage, setShowMessage] = useState(false);
  const [meetingLink, setMeetingLink] = useState(''); // State to store the meeting link

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Post form data to /api/virtual-consultations
      const consultationResponse = await axios.post('http://localhost:3000/api/virtual-consultations', formData);
  
      // Step 2: Request the video call link
      const videoCallResponse = await axios.post('http://localhost:3000/generate-video-call-link', formData);
      const meetingLink = videoCallResponse.data.link;
  
      // Step 3: Update the consultation record with the meeting link
      await axios.patch(`http://localhost:3000/api/virtual-consultations/${consultationResponse.data.id}`, { meetingLink });
  
      setMeetingLink(meetingLink);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 15000); // Show message for 15 seconds
    } catch (error) {
      console.error('Error requesting virtual consultation:', error);
      setShowMessage(false); // Hide message on error
    }
  };
  
  

  return (
    <motion.div
      className="container mx-auto mt-[93px] p-6 max-w-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-white">Virtual Consultation Form</h2>
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
          name="problem"
          placeholder="Describe the problem you're facing"
          value={formData.problem}
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
          name="previousTreatment"
          placeholder="Any previous treatments or therapies?"
          value={formData.previousTreatment}
          onChange={handleChange}
          className="w-full p-2 rounded h-24"
        />
        <textarea
          name="medications"
          placeholder="Current medications (if any)"
          value={formData.medications}
          onChange={handleChange}
          className="w-full p-2 rounded h-24"
        />
        <motion.button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Request Virtual Consultation
        </motion.button>
      </form>
      {showMessage && (
  <motion.div
    className="mt-4 p-4 bg-green-100 text-green-700 rounded"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {meetingLink ? (
      <div className="flex flex-col items-center">
        <p className="mb-4">Your virtual consultation request has been submitted.</p>
        <motion.a
          href={meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-6 py-2 rounded text-center w-full max-w-xs"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Click here to join the meeting
        </motion.a>
      </div>
    ) : (
      'Submitting your request...'
    )}
  </motion.div>
)}

      <motion.button
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaLanguage size={24} />
      </motion.button>
    </motion.div>
  );
};

export default VirtualConsultationForm;
