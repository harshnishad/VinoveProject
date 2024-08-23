import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; 

const Home = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    onLogin(username, password);
    if (username === 'admin' && password === '0000') {
      navigate('/admin');
    } else if (username === 'client' && password === '1111') {
      navigate('/client');
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Home;
