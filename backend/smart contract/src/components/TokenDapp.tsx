'use client'

import React, { useCallback } from 'react'
import { FC, useState } from 'react'
import { withdrawToken, transferTokens } from '@/services/tokenService'
import { TxStatus } from './TxStatus'
import { useWallet } from '@alephium/web3-react'
import { node } from '@alephium/web3'
import { TokenFaucetConfig } from '@/services/utils'
import { useEffect } from 'react'

export const TokenDapp: FC<{
  config: TokenFaucetConfig
}> = ({ config }) => {
  const { signer, account } = useWallet()
  const addressGroup = config.groupIndex
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [ongoingTxId, setOngoingTxId] = useState<string>()

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signer) {
      const result = await withdrawToken(signer, withdrawAmount, config.faucetTokenId)
      setOngoingTxId(result.txId)
    }
  }

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signer) {
      const result = await transferTokens(signer, recipientAddress, transferAmount)
      setOngoingTxId(result.txId)
    }
  }

  const txStatusCallback = useCallback(async (status: node.TxStatus, numberOfChecks: number): Promise<any> => {
    if (
      (status.type === 'Confirmed' && numberOfChecks > 2) ||
      (status.type === 'TxNotFound' && numberOfChecks > 3)
    ) {
      setOngoingTxId(undefined)
    }
    return Promise.resolve()
  }, [])

  useEffect(() => {
    const insuranceData = localStorage.getItem('insuranceData');
    if (insuranceData) {
      const { recipientAddress, amount } = JSON.parse(insuranceData);
      setRecipientAddress(recipientAddress);
      setTransferAmount(amount.toString());
      localStorage.removeItem('insuranceData'); // Clear after use
    }
  }, []);
  

  return (
    <div className="max-w-2xl mx-auto p-6">
      {ongoingTxId && <TxStatus txId={ongoingTxId} txStatusCallback={txStatusCallback} />}

      <div className="grid grid-cols-1 gap-8">
        {/* Token Withdrawal Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Token Faucet</h2>
          <p className="text-white mb-4">PublicKey: {account?.publicKey ?? '???'}</p>
          <p className="text-white mb-4">Maximum 2 tokens can be withdrawn at a time.</p>
          
          <form onSubmit={handleWithdrawSubmit}>
            <div className="mb-4">
              <label htmlFor="withdraw-amount" className="block text-white mb-2">
                Withdraw Amount
              </label>
              <input
                type="number"
                id="withdraw-amount"
                max="2"
                min="1"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full p-2 rounded bg-white/20 text-white"
              />
            </div>
            <button
              type="submit"
              disabled={!!ongoingTxId}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 
                       text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Withdraw Tokens
            </button>
          </form>
        </div>

        {/* Insurance Transfer Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Insurance Payment</h2>
          
          <form onSubmit={handleTransferSubmit}>
            <div className="mb-4">
              <label htmlFor="recipient-address" className="block text-white mb-2">
                Recipient Address
              </label>
              <input
                type="text"
                id="recipient-address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="w-full p-2 rounded bg-white/20 text-white"
                placeholder="Enter recipient address"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="transfer-amount" className="block text-white mb-2">
                Amount (ALPH)
              </label>
              <input
                type="number"
                id="transfer-amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="w-full p-2 rounded bg-white/20 text-white"
                placeholder="Enter amount to transfer"
              />
            </div>

            <button
              type="submit"
              disabled={!!ongoingTxId}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 
                       text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Send Insurance Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}