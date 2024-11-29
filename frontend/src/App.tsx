import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequestRide from './pages/RequestRide';
import RideOptions from './pages/RideOptions';
import RideHistory from './pages/RideHistory';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterDriver from './pages/RegisterDriver';
import Navbar from './pages/Navbar';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/request" element={<RequestRide />} />
                <Route path="/options" element={<RideOptions />} />
                <Route path="/history" element={<RideHistory />} />
                <Route path="/register-driver" element={<RegisterDriver />} />
            </Routes>
        </Router>
    );
};

export default App;