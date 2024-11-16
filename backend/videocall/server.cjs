const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const crypto = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser to parse URL-encoded data

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"]
    }
});

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Store virtual consultation requests
let consultations = [];
let appointments = [];
let sosRequests = [];

app.post('/api/sos', (req, res) => {
    const sosData = req.body;
    const id = crypto.randomBytes(8).toString('hex');
    const newSOS = { 
        id, 
        ...sosData,
        status: null,
        timestamp: new Date().toISOString()
    };
    sosRequests.push(newSOS);
    
    // Emit new SOS request to all connected clients
    io.emit('new-sos-request', newSOS);
    
    res.status(201).json(newSOS);
});

app.get('/api/sos', (req, res) => {
    res.json(sosRequests);
});

app.put('/api/sos/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const sosRequest = sosRequests.find(req => req.id === id);
    if (sosRequest) {
        sosRequest.status = status;
        io.emit('sos-status-update', { id, status });
        res.json(sosRequest);
    } else {
        res.status(404).json({ message: 'SOS request not found' });
    }
});

app.delete('/api/sos/:id', (req, res) => {
    const { id } = req.params;
    const index = sosRequests.findIndex(req => req.id === id);
    
    if (index !== -1) {
        sosRequests.splice(index, 1);
        io.emit('sos-request-deleted', id);
        res.json({ message: 'SOS request deleted' });
    } else {
        res.status(404).json({ message: 'SOS request not found' });
    }
});


// API to generate a unique video call link
app.post('/generate-video-call-link', (req, res) => {
    const sessionId = crypto.randomBytes(16).toString('hex');
    const videoCallLink = `http://localhost:5173/${sessionId}`;
    res.json({ link: videoCallLink });
});

// API to receive virtual consultation requests
app.post('/api/virtual-consultations', (req, res) => {
    const consultation = req.body;
    const id = crypto.randomBytes(8).toString('hex'); // Generate a unique ID for the consultation
    const newConsultation = { id, ...consultation }; // Add the ID to the consultation data
    consultations.push(newConsultation);
    res.status(201).json(newConsultation); // Return the new consultation with its ID
});

// API to update a consultation with the meeting link
app.patch('/api/virtual-consultations/:id', (req, res) => {
    const { id } = req.params;
    const { meetingLink } = req.body;

    const consultation = consultations.find(c => c.id === id);
    if (consultation) {
        consultation.meetingLink = meetingLink;
        res.json({ message: 'Consultation updated', consultation });
    } else {
        res.status(404).json({ message: 'Consultation not found' });
    }
});

// API to get all consultations
app.get('/api/virtual-consultations', (req, res) => {
    res.json(consultations);
});

app.post('/api/appointments', (req, res) => {
    const appointment = req.body;
    const id = crypto.randomBytes(8).toString('hex'); // Generate a unique ID for the appointment
    const newAppointment = { id, ...appointment }; // Add the ID to the appointment data
    appointments.push(newAppointment);
    res.status(201).json(newAppointment); // Return the new appointment with its ID
});

// API to get all appointments
app.get('/api/appointments', (req, res) => {
    res.json(appointments);
});

// WebSocket for signaling
io.on('connection', (socket) => {
    socket.on('offer', (offer) => socket.broadcast.emit('offer', offer));
    socket.on('answer', (answer) => socket.broadcast.emit('answer', answer));
    socket.on('ice-candidate', (candidate) => socket.broadcast.emit('ice-candidate', candidate));
    socket.on('sos-request', (data) => {
        io.emit('new-sos-request', data);
    });
});

server.listen(3000, () => console.log('Server running on port 3000'));
