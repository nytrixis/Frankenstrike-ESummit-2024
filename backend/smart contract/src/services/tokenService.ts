import { DUST_AMOUNT, ExecuteScriptResult, SignerProvider, ONE_ALPH } from '@alephium/web3'
import { Withdraw, Transfer } from '../../artifacts/ts/scripts'

export const withdrawToken = async (
  signerProvider: SignerProvider, 
  amount: string, 
  tokenId: string
): Promise<ExecuteScriptResult> => {
  return await Withdraw.execute(signerProvider, {
    initialFields: {
      token: tokenId,
      amount: BigInt(Math.floor(Number(amount) * 1e18))
    },
    attoAlphAmount: DUST_AMOUNT,
  })
}

export const transferTokens = async (
  signerProvider: SignerProvider, 
  recipientAddress: string, 
  amount: string
): Promise<ExecuteScriptResult> => {
  const transferAmount = BigInt(Math.floor(Number(amount) * 1e18))
  
  return await Transfer.execute(signerProvider, {
    initialFields: {
      recipient: recipientAddress,
      amount: transferAmount
    },
    attoAlphAmount: transferAmount + DUST_AMOUNT * 2n
  })
}