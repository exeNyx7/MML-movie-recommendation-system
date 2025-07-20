// src/pages/Login.js
import React, { useState } from 'react';
import api from '../api/axiosInstance';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await api.post('/users/login', { email, password });
            localStorage.setItem('token', res.data.token); // Save JWT
            alert('Login successful');
        } catch (err) {
            alert('Login failed');
            console.error(err);
        }
    };

    return (
        <div>
            <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
