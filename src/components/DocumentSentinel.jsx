import React, { useState } from 'react';
import axios from 'axios'; // For sending the encrypted file and key to the backend

const DocumentSentinel = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileHash, setFileHash] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }
  
    // Generate AES Key using Web Crypto API
    const key = await window.crypto.subtle.generateKey(
      { name: 'AES-CTR', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
    const exportedKey = await window.crypto.subtle.exportKey('raw', key);
    const keyHex = Array.from(new Uint8Array(exportedKey))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    setEncryptionKey(keyHex);
  
    // Read the file
    const fileData = await selectedFile.arrayBuffer();
  
    // Encrypt the file
    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const encryptedFile = await window.crypto.subtle.encrypt(
      { name: 'AES-CTR', counter: iv, length: 64 },
      key,
      fileData
    );
  
    // Prepare the encrypted file for upload
    const fileToUpload = new Blob([iv, new Uint8Array(encryptedFile)], { type: selectedFile.type });
  
    // Upload the encrypted file to the backend
    const formData = new FormData();
    formData.append('file', fileToUpload, selectedFile.name);
  
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // IPFS hash returned from the backend
      const { ipfsHash } = response.data;
      setFileHash(ipfsHash);
      setUploadStatus('File uploaded successfully and encrypted');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file');
    }
  };

  const sendKey = async (recipientAddress, encryptionKey) => {
    try {
      const response = await axios.post('/sendKey', {
        recipientAddress,
        encryptionKey
      });
  
      const { txID } = response.data;
      console.log(`Transaction successful with TXID: ${txID}`);
    } catch (error) {
      console.error('Error sending key:', error);
    }
  };
  
  return (
    <div className="container mt-[150px]">
      <h2>Document Sentinel</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload & Encrypt</button>

      {fileHash && (
        <div>
          <p><strong>IPFS Hash:</strong> {fileHash}</p>
          <p><strong>Encryption Key:</strong> {encryptionKey}</p>
        </div>
      )}
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};
export default DocumentSentinel;
