'use client'

import '@/styles/globals.css'
import { tokenFaucetConfig } from '@/services/utils'
import { AlephiumWalletProvider } from '@alephium/web3-react'
import { web3 } from '@alephium/web3'
import React, { useEffect } from 'react'

// Initialize web3 configuration
const initializeWeb3 = () => {
  if (typeof window !== 'undefined') {
    web3.setCurrentNodeProvider('https://node.testnet.alephium.org')
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    initializeWeb3()
  }, [])

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AlephiumWalletProvider 
          theme="web95" 
          network="testnet"
          addressGroup={tokenFaucetConfig.groupIndex}
        >
          {children}
        </AlephiumWalletProvider>
      </body>
    </html>
  )
}