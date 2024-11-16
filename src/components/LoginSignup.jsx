import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import SharedBackground from './SharedBackground';

// Firebase configuration (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyCzmbMfCSCnNt180N8knTh_AAHQULWCi9s",
  authDomain: "kawach-2e2dd.firebaseapp.com",
  projectId: "kawach-2e2dd",
  storageBucket: "kawach-2e2dd.appspot.com",
  messagingSenderId: "608995123680",
  appId: "1:608995123680:web:c56441173eecc75f100b85",
  measurementId: "G-0580NK7N7S"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [uniqueCode, setUniqueCode] = useState('');
  const [formData, setFormData] = useState({
    name: '', dob: '', gender: '', role: '', contactNumber: '', email: '', emergencyContact: '', password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const generateUniqueCode = () => {
    return 'U-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, dob, gender, role, contactNumber, email, emergencyContact, password } = formData;

    if (isLogin) {
      // Login logic with unique code
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
        navigate('/');
      } catch (error) {
        alert('Error logging in: ' + error.message);
      }
    } else {
      // Signup logic
      const uniqueCode = generateUniqueCode();
      const age = calculateAge(dob);
      const userData = { name, dob, gender, role, contactNumber, email, emergencyContact, age, uniqueCode };

      try {
        // Check if email already exists
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Add user data to Firestore
        await addDoc(collection(db, 'users'), userData);

        // Show unique code on screen
        alert(`Your unique code is: ${uniqueCode}. Please save this for login.`);
        navigate('/');
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('This email is already in use. Please log in.');
        } else {
          console.error('Error adding user: ', error);
        }
      }
    }
};


  return (
    <SharedBackground>
    <div className="min-h-screen flex items-center justify-center mt-20">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input type="text" name="name" placeholder="Name" onChange={handleInputChange} className="mb-4 w-full px-3 py-2 border rounded" />
              <input type="date" name="dob" onChange={handleInputChange} className="mb-4 w-full px-3 py-2 border rounded" />
              
              <select name="gender" onChange={handleInputChange} className="mb-4 w-full px-3 py-2 border rounded">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
              </select>
              
              <select name="role" onChange={handleInputChange} className="mb-4 w-full px-3 py-2 border rounded">
                <option value="">Select Role</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="chemist">Chemist</option>
              </select>
              
              <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleInputChange} className="mb-4 w-full px-3 py-2 border rounded" />
              <input type="email" name="email" placeholder="Email" onChange={handleInputChange} className="mb-4 w-full px-3 py-2 border rounded" />
              <input type="text" name="emergencyContact" placeholder="Emergency Contact" onChange={handleInputChange} className="mb-4 w-full px-3 py-2 border rounded" />
            </>
          )}
          {isLogin && (
            <input type="text" name="uniqueCode" placeholder="Unique Code" value={uniqueCode} onChange={(e) => setUniqueCode(e.target.value)} className="mb-4 w-full px-3 py-2 border rounded" />
          )}
          
          <input type="password" name="password" placeholder="Password" onChange={handleInputChange} className="mb-4 w-full px-3 py-2 border rounded" />
          
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-blue-500">
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </button>
        {!isLogin && uniqueCode && (
          <div className="mt-4 text-green-500">
            <p>Your unique code: <strong>{uniqueCode}</strong></p>
          </div>
        )}
      </div>
    </div>
    </SharedBackground>
  );
};

export default LoginSignup;
