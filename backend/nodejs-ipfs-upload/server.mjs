import express from 'express';
import multer from 'multer';
import pinataSDK from '@pinata/sdk';
import cors from 'cors';
import { Readable } from 'stream';
import { sendKeyViaAvalanche, getKeyFromAvalanche } from './avalancheutils.js';

const app = express(); 
const port = 5000;
app.use(cors());
app.use(express.json()); // Add middleware to parse JSON bodies

// Set up Pinata client
const pinata = new pinataSDK('47a8e5e7bc1a1fad8e36', '6397efc3f0a96b1318fe09cc04c2a29f9b334ba4c9b9e288a71ee27949c6bec6');

// Set up file storage using multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const stream = Readable.from(fileBuffer);
    
    // Upload file to IPFS using Pinata
    const result = await pinata.pinFileToIPFS(stream, {
      pinataMetadata: {
        name: req.file.originalname
      }
    });

    // IPFS hash returned
    const ipfsHash = result.IpfsHash;
    res.status(200).json({ ipfsHash });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

app.post('/sendKey', async (req, res) => {
  const { recipientAddress, encryptionKey } = req.body;

  try {
    const txID = await sendKeyViaAvalanche(recipientAddress, encryptionKey);
    res.status(200).json({ txID });
  } catch (error) {
    console.error('Error sending key via Avalanche:', error);
    res.status(500).json({ error: 'Error sending key' });
  }
});

app.post('/getKey', async (req, res) => {
  const { txID } = req.body;

  try {
    const aesKey = await getKeyFromAvalanche(txID);
    res.status(200).json({ encryptionKey: aesKey });
  } catch (error) {
    console.error('Error retrieving key from Avalanche:', error);
    res.status(500).json({ error: 'Error retrieving key' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
