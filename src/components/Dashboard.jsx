import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch requests from your backend or local storage
    // For now, we'll use mock data
    const mockRequests = [
      { id: 1, name: 'John Doe', age: 35, gender: 'Male', latitude: 28.6139, longitude: 77.2090, symptoms: 'Chest pain', problem: 'Possible heart attack' },
      { id: 2, name: 'Jane Smith', age: 28, gender: 'Female', latitude: 19.0760, longitude: 72.8777, symptoms: 'Difficulty breathing', problem: 'Asthma attack' },
    ];
    setRequests(mockRequests);
  }, []);

  const handleAction = (id, action) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: action } : req
    ));
  };

  const handleDelete = (id) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  return (
    <motion.div 
      className="container mx-auto p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 mt-20 text-gray-300">Emergency Requests Dashboard</h1>
      <table className="w-full bg-black text-white rounded-lg overflow-hidden">
        <thead className="bg-gray-800">
          <tr>
            <th className="py-3 px-4 text-left">Sl. No</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Age</th>
            <th className="py-3 px-4 text-left">Gender</th>
            <th className="py-3 px-4 text-left">Geolocation</th>
            <th className="py-3 px-4 text-left">Symptoms</th>
            <th className="py-3 px-4 text-left">Problem</th>
            <th className="py-3 px-4 text-left">Ambulance Dispatch</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={request.id} className="border-b border-gray-700">
              <td className="py-4 px-4">{index + 1}</td>
              <td className="py-4 px-4">{request.name}</td>
              <td className="py-4 px-4">{request.age}</td>
              <td className="py-4 px-4">{request.gender}</td>
              <td className="py-4 px-4">
                <a 
                  href={`https://www.google.com/maps?q=${request.latitude},${request.longitude}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {request.latitude}, {request.longitude}
                </a>
              </td>
              <td className="py-4 px-4">{request.symptoms}</td>
              <td className="py-4 px-4">{request.problem}</td>
              <td className="py-4 px-4">
                <button 
                    onClick={() => handleAction(request.id, 'sent')}
                    className={`mr-2 px-3 py-1 rounded ${
                    request.status === 'sent' 
                        ? 'bg-green-600' 
                        : request.status 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                    disabled={request.status && request.status !== 'sent'}
                >
                    Sent
                </button>
                <button 
                    onClick={() => handleAction(request.id, 'received')}
                    className={`mr-2 px-3 py-1 rounded ${
                    request.status === 'received' 
                        ? 'bg-yellow-600' 
                        : request.status 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-yellow-500 hover:bg-yellow-600'
                    }`}
                    disabled={request.status && request.status !== 'received'}
                >
                    Received
                </button>
                <button 
                    onClick={() => handleDelete(request.id)}
                    className={`px-3 py-1 rounded ${
                    request.status 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-red-500 hover:bg-red-600'
                    }`}
                    disabled={request.status}
                >
                    Delete
                </button>
                </td>

            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Dashboard;
