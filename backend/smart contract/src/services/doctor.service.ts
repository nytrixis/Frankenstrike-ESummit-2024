import { DUST_AMOUNT, ExecuteScriptResult, SignerProvider } from '@alephium/web3'
import { Doctor } from '../../artifacts/ts/Doctor'
// import { DOCTOR_ADDRESS } from '../constants/addresses'

export const DOCTOR_ADDRESS = "15WvWB8qzHnqxWQu3ifAbv35ekBNWNBm2NnwwiDrCSekd"

export const getDoctorBalance = async (signerProvider: SignerProvider): Promise<bigint> => {
  const doctorContract = Doctor.at(DOCTOR_ADDRESS)
  return await doctorContract.methods.getBalance()
}

export const withdrawDoctorBalance = async (
  signerProvider: SignerProvider, 
  amount: string
): Promise<ExecuteScriptResult> => {
  const doctorContract = Doctor.at(DOCTOR_ADDRESS)
  return await doctorContract.methods.withdraw({
    initialFields: { amount: BigInt(amount) },
    attoAlphAmount: DUST_AMOUNT
  })
}
