import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ThreatList = () => {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchThreats = async () => {
    try {
      setLoading(true);
      const params = { page, limit };
      if (search.trim()) params.search = search;
      if (category) params.category = category;

      const response = await axios.get('http://localhost:5000/api/threats', { params });
      const data = response.data;
      setThreats(data.threats || []);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreats();
  }, [page, category, search]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Threat Records</h2>

      <input
        type="text"
        placeholder="Search description..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <select
        value={category}
        onChange={(e) => { setCategory(e.target.value); setPage(1); }}
        style={{ padding: '5px' }}
      >
        <option value="">All Categories</option>
        <option value="Phishing">Phishing</option>
        <option value="Malware">Malware</option>
        <option value="DDoS">DDoS</option>
        <option value="Ransomware">Ransomware</option>
      </select>

      {loading ? <p>Loading...</p> : (
        <>
          <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Description</th>
                <th>Severity</th>
                <th>Geo Location</th>
              </tr>
            </thead>
            <tbody>
              {threats.map((t) => (
                <tr
                  key={t.id}
                  style={{
                    backgroundColor:
                      t.severity === 'High' ? '#f8d7da' :
                      t.severity === 'Medium' ? '#fff3cd' :
                      t.severity === 'Low' ? '#d4edda' : '',
                  }}
                >
                  <td><Link to={`/threats/${t.id}`}>{t.id}</Link></td>
                  <td>{t.category}</td>
                  <td>{t.description}</td>
                  <td>{t.severity}</td>
                  <td>{t.geo_location}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '20px' }}>
            <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page <= 1}>Previous</button>
            <span style={{ margin: '0 10px' }}>Page {page}</span>
            <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page >= totalPages}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ThreatList;
