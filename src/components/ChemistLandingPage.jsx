import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import doctor1 from '../assets/doctor1.jpg';
import doctor2 from '../assets/doctor2.jpg';
import doctor3 from '../assets/doctor3.jpg';
const FeatureCard = ({ image, title, description, link, className }) => (
  <motion.div 
    className={`w-1/3 p-4 ${className}`}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-700 mb-4">{description}</p>
        <Link to={link} className="bg-primary text-white px-4 py-2 rounded">
          Learn More
        </Link>
      </div>
    </motion.div>
  </motion.div>
);

const ChemistLandingPage = () => {
  return (
    <motion.div 
      className="relative min-h-screen w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="relative z-10 pt-[100px]"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h2 
          className="text-4xl font-bold text-white text-center mb-[20px] mt-[50px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Chemist Dashboard
        </motion.h2>
        <motion.h4 
          className="text-2xl font-normal text-white text-center mb-[80px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Manage Prescriptions and provide Medications to Patients
        </motion.h4>
        <div className="flex justify-between w-full">
          <FeatureCard
            image={doctor1}
            title="Appointments"
            description="A comprehensive view of all  appointments, simplifying scheduling and management."
            link="/feature1"
            className="pl-20"
          />
          <FeatureCard
            image={doctor2}
            title="Consultation Forms"
            description="Streamlined form  to manage consultation requests and patient communication seamlessly."
            link="/feature2"
          />
          <FeatureCard
            image={doctor3}
            title="Document Sentinel"
            description="Securely exchange information through a decentralized system, ensuring privacy."
            link="/feature3"
            className="pr-20"
          />
        </div>
      </motion.div>
      <div className="py-12">
      </div>
    </motion.div>
  );
};

export default ChemistLandingPage;
