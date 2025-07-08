import axios from 'axios';
import { useState } from 'react';

const ThreatAnalysis = () => {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const analyze = () => {
    setError('');
    setResult(null);

    axios.post('http://localhost:5000/api/analyze', { description })
      .then((res) => {
        setResult(res.data.predicted_category);
      })
      .catch((err) => {
        console.error('Prediction API error:', err);
        setError(
          err.response?.data?.error || 'Failed to analyze threat. Please try again later.'
        );
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Threat Category Analysis</h2>
      <textarea
        rows={6}
        cols={60}
        placeholder="Paste threat description here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: '10px' }}
      />
      <br />
      <button onClick={analyze} style={{ marginTop: '10px' }}>Analyze</button>

      {result && (
        <p style={{ marginTop: '20px' }}>
          🔍 Predicted Category: <strong>{result}</strong>
        </p>
      )}

      {error && (
        <p style={{ color: 'red', marginTop: '20px' }}>
          ❌ {error}
        </p>
      )}
    </div>
  );
};

export default ThreatAnalysis;
