const express = require('express');
const router = express.Router();

// Store prescriptions in memory for now
let prescriptions = [];

// Create new prescription
router.post('/', async (req, res) => {
    try {
        const prescription = {
            id: Date.now(),
            ...req.body,
            nftId: 'NFT-' + Math.random().toString(36).substr(2, 9)
        };
        prescriptions.push(prescription);
        res.status(201).json(prescription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all prescriptions
router.get('/', (req, res) => {
    res.json(prescriptions);
});

module.exports = router;
