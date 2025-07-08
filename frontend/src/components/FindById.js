import axios from 'axios';
import { useState } from 'react';

const FindById = () => {
  const [id, setId] = useState('');
  const [threat, setThreat] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!id) return;
    setError('');
    setThreat(null);
    try {
      const res = await axios.get(`http://localhost:5000/api/threats/${id}`);
      setThreat(res.data);
    } catch (err) {
      setError('Threat not found');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Find Threat by ID</h2>
      <input
        type="number"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter Threat ID"
        style={{ padding: '5px', marginRight: '10px' }}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {threat && (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <tbody>
            {Object.entries(threat).map(([key, value]) => (
              <tr key={key}>
                <td style={{ fontWeight: 'bold', padding: '8px', border: '1px solid #ccc' }}>{key}</td>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>{String(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FindById;
