import dotenv from 'dotenv';
import { Avalanche } from 'avalanche';
import { Buffer } from 'buffer'; // Import Buffer from Node.js standard library

dotenv.config();

// Initialize Avalanche instance
const avalanche = new Avalanche("api.avax.network", 443, "https");
const avm = avalanche.XChain(); // X-Chain (AVM API for AVAX)
const keychain = avm.keyChain();

// Sender's private key (use environment variables for security)
const privateKey = process.env.AVALANCHE_PRIVATE_KEY;
if (!privateKey) {
  throw new Error('AVALANCHE_PRIVATE_KEY is not defined in environment variables');
}
const privateKeyBuffer = Buffer.from(privateKey, 'hex');
keychain.importKey(privateKeyBuffer);

const sendKeyViaAvalanche = async (recipientAddress, aesKey) => {
  try {
    // Create transaction
    const tx = await avm.buildTx({
      to: recipientAddress,
      amount: 0,
      data: Buffer.from(aesKey, 'hex'), // Include the AES key in transaction data
      from: keychain.getAddressStrings()[0]
    });

    // Sign transaction
    const signedTx = avm.signTx(tx, keychain);
    
    // Send transaction
    const txID = await avm.issueTx(signedTx);
    return txID;
  } catch (error) {
    console.error('Error sending key via Avalanche:', error);
    throw error;
  }
};

const getKeyFromAvalanche = async (txID) => {
    try {
      // Get transaction by ID
      const tx = await avm.getTx(txID);
  
      // Extract AES key from transaction data
      if (tx && tx.tx && tx.tx.tx && tx.tx.tx.tx && tx.tx.tx.tx.data) {
        const dataBuffer = Buffer.from(tx.tx.tx.tx.data, 'hex');
        const aesKey = dataBuffer.toString('hex');
        return aesKey;
      } else {
        throw new Error('Transaction does not contain data');
      }
    } catch (error) {
      console.error('Error retrieving key from Avalanche:', error.message);
      throw error;
    }
  };  

// Export the functions
export { sendKeyViaAvalanche, getKeyFromAvalanche };
