import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RequestRide from './pages/RequestRide';
import RideOptions from './pages/RideOptions';
import RideHistory from './pages/RideHistory';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterDriver from './pages/RegisterDriver';
import Navbar from './pages/Navbar';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        
        const token = localStorage.getItem('token') as string;
        if (token) {
        setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            {isAuthenticated && <Navbar />}
            <Routes>
                <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/request" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/request" element={isAuthenticated ? <RequestRide /> : <Navigate to="/" />} />
                <Route path="/options" element={isAuthenticated ? <RideOptions /> : <Navigate to="/" />} />
                <Route path="/history" element={isAuthenticated ? <RideHistory /> : <Navigate to="/" />} />
                <Route path="/register-driver" element={isAuthenticated ? <RegisterDriver /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
