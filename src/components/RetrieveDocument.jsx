import React, { useState } from 'react';
import axios from 'axios';

const RetrieveDocument = () => {
  const [ipfsHash, setIpfsHash] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [decryptedFile, setDecryptedFile] = useState(null);
  const [error, setError] = useState('');

  const handleRetrieve = async () => {
    if (!ipfsHash || !recipientAddress) {
      alert('Please provide IPFS hash and recipient address.');
      return;
    }

    try {
      // Fetch the encrypted file from IPFS
      const fileResponse = await axios.get(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`, {
        responseType: 'arraybuffer'
      });
      const encryptedFileData = fileResponse.data;

      // Fetch the encryption key using the recipient address
      const keyResponse = await axios.post('http://localhost:5000/getKey', { txID: recipientAddress });
      const { encryptionKey } = keyResponse.data;

      // Decrypt the file using the encryption key
      const decryptedFileData = await decryptFile(encryptedFileData, encryptionKey);
      setDecryptedFile(new Blob([decryptedFileData]));

    } catch (err) {
      console.error('Error retrieving document:', err);
      setError('Error retrieving document');
    }
  };

  const decryptFile = async (encryptedFileData, encryptionKey) => {
    const keyBuffer = new Uint8Array(encryptionKey.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const key = await window.crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'AES-CTR' },
      true,
      ['decrypt']
    );

    const iv = encryptedFileData.slice(0, 16); // IV is the first 16 bytes
    const encryptedData = encryptedFileData.slice(16); // Rest is the encrypted data

    const decryptedFile = await window.crypto.subtle.decrypt(
      { name: 'AES-CTR', counter: iv, length: 64 },
      key,
      encryptedData
    );

    return decryptedFile;
  };

  return (
    <div className="container mt-[150px]">
      <h2>Retrieve Document</h2>
      <input
        type="text"
        placeholder="IPFS Hash"
        value={ipfsHash}
        onChange={(e) => setIpfsHash(e.target.value)}
      />
      <input
        type="text"
        placeholder="Transaction ID (Use recipientAddress)"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />
      <button onClick={handleRetrieve}>Retrieve & Decrypt</button>

      {decryptedFile && (
        <div>
          <p><strong>Document Download:</strong></p>
          <a href={URL.createObjectURL(decryptedFile)} download="decrypted-file">Download Decrypted File</a>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default RetrieveDocument;
