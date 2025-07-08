import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust port if needed

const LiveFeed = () => {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    socket.on('new_threat', (data) => {
      setThreats((prev) => [data, ...prev]);
    });

    return () => {
      socket.off('new_threat');
    };
  }, []);

  return (
    <div style={{ background: '#f0f0f0', padding: '1rem' }}>
      <h3>🔴 Live Threat Feed</h3>
      {threats.map((t, index) => (
        <div key={t.id || index} style={{ marginBottom: '0.5rem' }}>
          <b>{t.category}</b> |<br />
          <small>{t.description}</small>
        </div>
      ))}
    </div>
  );
};

export default LiveFeed;
