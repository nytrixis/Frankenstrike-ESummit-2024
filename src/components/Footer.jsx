import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import image from '../assets/image.png';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8 relative z-[3000]">
        <div className="container mx-auto text-center mb-8">
    <img src={image} alt="Kawach Logo" className="w-[65px] h-[65px] mx-auto mb-4" />
    <p className="text-lg text-gray-400">Empowering you to take control of your health, anytime, <br />anywhere.</p>
  </div>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center pl-10">
          <img src={logo} alt="Kawach Logo" className="h-12 w-12 mr-2" />
          <span className="text-xl font-semibold text-text">KAWACH</span>
        </div>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-accent">Home</Link>
          <Link to="/" className="hover:text-accent">Campaigns</Link>
          <Link to="/" className="hover:text-accent">Email</Link>
          <Link to="/" className="hover:text-accent">Marketing</Link>
          <Link to="/" className="hover:text-accent">Offline</Link>
          <Link to="/" className="hover:text-accent">Contact Us</Link>
          <Link to="/" className="hover:text-accent">FAQs</Link>

        </div>
        <div className="text-sm pr-10">
          &copy; {new Date().getFullYear()} KAWACH. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
