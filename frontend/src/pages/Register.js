import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Register({ onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const registerUser = async () => {
    setMsg('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/register', {
        username,
        password,
      });

      setMsg(res.data.msg);
      if (onRegisterSuccess) onRegisterSuccess(); // Optional callback
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Username already exists. Try a different one.');
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>🔐 Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
      />
      <button
        onClick={registerUser}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Register
      </button>

      {msg && <p style={{ color: 'green', marginTop: '10px' }}>{msg}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}

Register.propTypes = {
  onRegisterSuccess: PropTypes.func,
};
