import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import logo from '../assets/logo.png';
const Navbar = () => {
  return (
    <nav className="bg-primary bg-opacity-70 text-white font-poppins fixed top-0 left-0 right-0 w-full z-50">
      {/* Full-width container with 10px padding on left and right */}
      <div className="flex items-center justify-between px-[10px] h-10 xl:h-[93px] w-full">
        
        {/* Left: Kawach Logo and Name */}
        <div className="flex items-center ml-10">
          <img src={logo} alt="Kawach Logo" className="h-12 w-12" style={{ width: '65px', height: '65px' }} />
          <span className="ml-2 text-xl font-semibold text-text">KAWACH</span>
        </div>

        {/* Middle NavLinks */}
        <div className="bg-primary rounded-full px-6 border-2 border-opacity-50 flex items-center justify-center border-white w-full max-w-[1150px]" style={{ height: '2.5rem' }}>
  <div className="flex space-x-10 text-l text-gray-400">
    <NavLink to="/">Home</NavLink>
    <NavLink to="/about">About</NavLink>
    <NavLink to="/contact">Contact Us</NavLink>
  </div>
</div>

        {/* Right: User Icon */}
        <div>
          <Link to="/auth" className="flex items-center justify-center rounded-full bg-white h-10 w-10 mr-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="px-4 rounded-full text-lg font-medium hover:bg-accent hover:text-background transition duration-300 flex items-center justify-center"
    style={{ height: '2rem' }}
  >
    {children}
  </Link>
);

export default Navbar;