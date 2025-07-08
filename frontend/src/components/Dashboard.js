import { useEffect, useState } from 'react';
import { getStats } from '../api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats();
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h3>Statistics Overview</h3>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <strong>Total Threats:</strong> {stats.total}
        </div>
        <div>
          <strong>Threats by Category:</strong>
          <ul>
            {Object.entries(stats.by_category).map(([cat, count]) => (
              <li key={cat}>{cat}: {count}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Threats by Severity:</strong>
          <ul>
            {Object.entries(stats.by_severity).map(([level, count]) => (
              <li key={level}>Severity {level}: {count}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
