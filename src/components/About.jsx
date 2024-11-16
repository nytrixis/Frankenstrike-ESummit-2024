import React from 'react';
import SharedBackground from './SharedBackground';
import logo from '../assets/logo.png';
import Footer from './Footer';
import { motion } from 'framer-motion';
const About = () => {
  return (
    <SharedBackground>
      <motion.div className="container mx-auto px-4 py-16 text-white mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
        <motion.div className="flex flex-col items-center mb-12"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}>
          <img src={logo} alt="KAWACH Logo" className="w-24 h-24 mb-4" />
          <h1 className="text-5xl font-bold text-center">About KAWACH</h1>
        </motion.div>
        <motion.div 
  className="max-w-4xl mx-auto space-y-12"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <motion.section
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <motion.h2 
      className="text-3xl font-semibold mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      Our Mission
    </motion.h2>
    <motion.p 
      className="text-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      KAWACH is a revolutionary healthcare platform designed to protect lives and empower care. We provide instant medical assistance and streamline healthcare services for patients, doctors, and chemists.
    </motion.p>
  </motion.section>

  <motion.section
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
  >
    <motion.h2 
      className="text-3xl font-semibold mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      Key Features
    </motion.h2>
    <motion.div 
      className="grid grid-cols-2 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      {['Virtual Consultations', 'Emergency SOS Response', 'Secure Medical Records', 'Integrated Pharmacy Services'].map((feature, index) => (
        <motion.div 
          key={index} 
          className="bg-white bg-opacity-10 p-4 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
        >
          <p className="text-lg font-medium">{feature}</p>
        </motion.div>
      ))}
    </motion.div>
  </motion.section>

  <motion.section
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 1.2 }}
  >
    <motion.h2 
      className="text-3xl font-semibold mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.3 }}
    >
      How to Use KAWACH
    </motion.h2>
    <motion.ol 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.4 }}
    >
      {[
        "Sign up and choose your role",
        "Log in with your unique code",
        "Explore the dashboard",
        "Use SOS for emergencies",
        "Schedule virtual consultations",
        "Manage medical records",
        "Process prescriptions (for chemists)"
      ].map((step, index) => (
        <motion.li 
          key={index} 
          className="flex items-start"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
        >
          <span className="bg-accent text-primary font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
            {index + 1}
          </span>
          <p className="text-lg">{step}</p>
        </motion.li>
      ))}
    </motion.ol>
  </motion.section>
</motion.div>

      </motion.div>
      <Footer />
    </SharedBackground>
    
  );
};

export default About;
