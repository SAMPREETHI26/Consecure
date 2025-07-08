import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ThreatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [threat, setThreat] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/threats/${id}`)
      .then(res => setThreat(res.data))
      .catch(() => navigate('/'));
  }, [id, navigate]);

  if (!threat) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Threat Detail</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {Object.entries(threat).map(([key, value]) => (
            <tr key={key}>
              <td style={{ fontWeight: 'bold', padding: '8px', border: '1px solid #ccc' }}>{key}</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate(-1)} style={{ marginTop: '20px' }}>Back</button>
    </div>
  );
};

export default ThreatDetail;
