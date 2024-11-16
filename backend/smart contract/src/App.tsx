import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PatientBg from './components/PatientBg'
import PatientNavbar from './components/PatientNavbar'
import PatientLandingPage from './components/PatientLandingPage'
import InsurancePage from './components/InsurancePage'
import PaymentPage from './components/PaymentPage'
import { TokenDapp } from './components/TokenDapp' // Import TokenDapp component

const tokenFaucetConfig: { network: 'testnet' | 'mainnet' | 'devnet'; groupIndex: number; tokenFaucetAddress: string; faucetTokenId: string } = {
  network: 'testnet',
  groupIndex: 0,
  tokenFaucetAddress: '267yXNqnH6Wi58Ht8YpCZABMSAMr7JJ8dT8QFM4kEbbx3',
  faucetTokenId: 'a9d9ac3ce8a23a41a10ce340f68e9efa6a9b2be947644da009df69f167a74500'
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PatientBg>
        <PatientNavbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<PatientLandingPage />} />
            <Route path="/insurance" element={<InsurancePage />} />
            <Route path="/insurance/payment" element={<PaymentPage />} />
            <Route path="/tokendapp" element={<TokenDapp config={tokenFaucetConfig} />} />
            <Route path="*" element={<div>404 Not Found</div>} /> {/* Catch-all route for 404 */}
          </Routes>
        </div>
      </PatientBg>
    </BrowserRouter>
  )
}

export default App