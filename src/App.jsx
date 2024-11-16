import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExploreFeatures from './components/ExploreFeatures';
import './components/card.css';
import Footer from './components/Footer';
import SharedBackground from './components/SharedBackground';
import LoginSignup from './components/LoginSignup';
import About from './components/About';
import ContactUs from './components/ContactUs';
import DoctorNavbar from './components/DoctorNavbar';
import LandingPage from './components/DoctorLandingPage';
import DoctorBg from './components/DoctorBg';
import SOSPage from './components/SOS';
import Dashboard from './components/Dashboard';
import PredictionComponent from './components/PredictionComponent';
import DocumentSentinel from './components/DocumentSentinel';
import RetrieveDocument from './components/RetrieveDocument';
import ChemistNavbar from './components/ChemistNavbar';
import ChemistBg from './components/ChemistBg';
import ChemistLandingPage from './components/ChemistLandingPage';
import PatientNavbar from './components/PatientNavbar';
import PatientBg from './components/PatientBg';
import PatientLandingPage from './components/PatientLandingPage';
import AppointmentForm from './components/AppointmentForm';
import VideoCallPage from './components/VideoCallPage';
import VirtualConsultationForm from './components/VirtualConsultationForm';
import DoctorDash from './components/DoctorDash';
import Insurance from './components/Insurance';
import { AlephiumWalletProvider } from '@alephium/web3-react';

function App() {
  return (
    <AlephiumWalletProvider>
    <Router>
      <div className="bg-background min-h-screen font-poppins">
        <Routes>
          <Route path="/" element={
            <>
            <Navbar />
            <SharedBackground>
              <HeroSection />
              <ExploreFeatures />
              <Footer />
            </SharedBackground>
            </>
          } />
          <Route path="/auth" element={
            <>
            <Navbar />
            <SharedBackground>
              <LoginSignup />
              <Footer />
            </SharedBackground>
            </>
          } />
          <Route path="/about" element={
            <>
            <Navbar />
            <SharedBackground>
              <About />
            </SharedBackground>
            </>
          } />
          <Route path="/contact" element={
            <>
            <Navbar />
            <SharedBackground>
              <ContactUs />
            </SharedBackground>
            </>
          } />
          <Route path='/doctor' element={
            <>
            <DoctorNavbar />
            <DoctorBg>
              <LandingPage />
              <Footer />
            </DoctorBg>
            </>
          } />
          <Route path='/chemist' element={
            <>
            <ChemistNavbar />
            <ChemistBg>
              <ChemistLandingPage />
              <Footer />
            </ChemistBg>
            </>
          } />
          <Route path='/patient' element={
            <>
            <PatientNavbar />
            <PatientBg>
              <PatientLandingPage />
              <Footer />
            </PatientBg>
            </>
          } />
          <Route path='/appointment' element={
            <>
            <PatientNavbar />
            <PatientBg>
              <AppointmentForm />
              <Footer />
            </PatientBg>
            </>
          } />
          <Route path='/consultation' element={
            <>
            <PatientNavbar />
            <PatientBg>
              <VirtualConsultationForm />
              <Footer />
            </PatientBg>
            </>
          } />
          <Route path="/:sessionId" element={
            <>
            <PatientNavbar />
            <PatientBg>
              <VideoCallPage />
              <Footer />
            </PatientBg>
            </>
          } />
          <Route path='/sos' element={
            <>
            <Navbar />
            <SharedBackground>
              <SOSPage />
              <Footer />
            </SharedBackground>
            </>
          } />
          <Route path='/dashboard' element={
            <>
            <DoctorNavbar />
            <SharedBackground>
              <Dashboard />
              <Footer />
            </SharedBackground>
            </>
          } />
          <Route path='/dash' element={
            <>
            <PatientNavbar />
            <SharedBackground>
              <DoctorDash />
              <Footer />
            </SharedBackground>
            </>
          } />

          <Route path='/prediction' element={
            <>
            <PatientNavbar />
            <SharedBackground>
              <PredictionComponent />
              <Footer />
            </SharedBackground>
            </>
          } />
          <Route path='/docsen' element={
            <>
            <PatientNavbar />
            <SharedBackground>
              <DocumentSentinel />
              <Footer />
            </SharedBackground>
            </>
          } />

          <Route path='/retrieve' element={
            <>
            <Navbar />
            <SharedBackground>
              <RetrieveDocument />
              <Footer />
            </SharedBackground>
            </>
          } />
          <Route path='/insurance' element={
            <>
            <PatientNavbar />
            <PatientBg>
              <Insurance />
              <Footer />
            </PatientBg>
            </>
          } />
        </Routes>
        
      </div>

    </Router>
    </AlephiumWalletProvider>
  );
}
export default App;