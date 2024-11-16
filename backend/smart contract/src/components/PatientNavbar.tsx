import React from 'react';
import { Link } from 'react-router-dom';
import { AlephiumConnectButton } from '@alephium/web3-react';
import logo from '../assets/logo.png';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
  <Link
    to={to}
    className="px-4 rounded-full text-lg font-medium hover:bg-accent hover:text-background transition duration-300 flex items-center justify-center"
    style={{ height: '2rem' }}
  >
    {children}
  </Link>
);

const PatientNavbar: React.FC = () => {
  return (
    <nav className="bg-primary bg-opacity-70 text-white font-poppins fixed top-0 left-0 right-0 w-full z-50">
      <div className="flex items-center justify-between px-[10px] h-10 xl:h-[93px] w-full">
        <div className="flex items-center ml-5">
          <img src={logo} alt="Kawach Logo" className="h-12 w-12" style={{ width: '65px', height: '65px' }} />
          <span className="ml-2 text-xl font-semibold text-text">KAWACH</span>
        </div>

        <div className="bg-primary rounded-full px-6 border-2 border-opacity-30 flex items-center justify-center border-white w-full max-w-[1000px]" style={{ height: '2.5rem' }}>
          <div className="flex space-x-10 text-l text-gray-400">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/sosreq">SOS Requests</NavLink>
            <NavLink to="/docsen">Document Sentinel</NavLink>
            <NavLink to="/consultation">Consultation</NavLink>
            <NavLink to="/workspace">Workspace</NavLink>
          </div>
        </div>

        <div className='flex items-center mr-5'>
          <AlephiumConnectButton.Custom>
            {({ isConnected, disconnect, show, account }) => (
              <button
                className="px-4 py-2 text-sm font-medium transition duration-300 mr-5
                         border-2 border-blue-400 text-blue-400
                         hover:border-blue-300 hover:text-blue-300
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                         animate-pulse"
                style={{
                  boxShadow: '0 0 10px #60A5FA, 0 0 10px #60A5FA, 0 0 10px #60A5FA',
                }}
                onClick={isConnected ? disconnect : show}
              >
                {isConnected
                  ? `${account?.address?.slice(0,6)}...${account?.address?.slice(-4)}`
                  : 'Connect Wallet'
                }
              </button>
            )}
          </AlephiumConnectButton.Custom>

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

export default PatientNavbar;
