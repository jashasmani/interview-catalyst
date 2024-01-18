import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate=useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/login', { email, password });
            // const token  = response.data;
            console.log(response.data);
            localStorage.setItem("token",response.data.token);
            navigate('/home1');
            
        } catch (error) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className='main-1'>
            <h2>Login</h2>
            <div>
                <label>Username:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin} className='b1'>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
