import axios from 'axios';
import { useState } from 'react';

export default function SecureAnalyzer() {
  const [desc, setDesc] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const analyze = async () => {
    setError('');
    setResult(null);
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Unauthorized. Please login first.');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/analyze',
        { description: desc },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(res.data.predicted_category);
    } catch (err) {
      console.error('Analysis failed:', err);
      if (err.response?.status === 401) {
        setError('Unauthorized access. Please log in again.');
      } else {
        setError('Failed to analyze threat. Please try again later.');
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h3>🔒 Secure Threat Analyzer</h3>
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        rows={6}
        cols={60}
        placeholder="Paste threat description..."
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
      />
      <br />
      <button
        onClick={analyze}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Analyze
      </button>

      {result && (
        <p style={{ marginTop: '20px' }}>
          🧠 Predicted Category: <strong>{result}</strong>
        </p>
      )}

      {error && (
        <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
      )}
    </div>
  );
}
