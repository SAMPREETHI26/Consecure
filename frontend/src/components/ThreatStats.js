import axios from 'axios';
import { useEffect, useState } from 'react';

// Helper to get severity color
const getSeverityColor = (severity) => {
  const s = severity.toLowerCase();
  if (s === 'high') return '#ff4d4f';
  if (s === 'medium') return '#faad14';
  return '#52c41a'; // low or others
};

const ThreatStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/threats/stats')
      .then(res => setStats(res.data))
      .catch(console.error);
  }, []);

  if (!stats) return <p style={{ padding: '20px' }}>Loading stats...</p>;

  const card = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px 20px',
    marginBottom: '15px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  };

  const section = {
    marginBottom: '30px',
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial' }}>
      <h2 style={{ color: '#333', marginBottom: '30px' }}>📊 Threat Statistics</h2>

      <div style={section}>
        <div style={{ ...card, backgroundColor: '#f0f8ff' }}>
          <h3>Total Threats</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.total_threats}</p>
        </div>
      </div>

      <div style={section}>
        <h3 style={{ marginBottom: '10px' }}>By Category</h3>
        {Object.entries(stats.category_counts).map(([key, val]) => (
          <div key={key} style={card}>
            <strong>{key}</strong>: {val}
          </div>
        ))}
      </div>

      <div style={section}>
        <h3 style={{ marginBottom: '10px' }}>By Severity</h3>
        {Object.entries(stats.severity_counts).map(([key, val]) => (
          <div
            key={key}
            style={{
              ...card,
              borderLeft: `6px solid ${getSeverityColor(key)}`,
            }}
          >
            <strong>{key}</strong>: {val}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreatStats;
