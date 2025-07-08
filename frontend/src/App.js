import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import FindById from './components/FindById';
import LiveFeed from './components/LiveFeed';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import ThreatAnalysis from './components/ThreatAnalysis';
import ThreatDetail from './components/ThreatDetail';
import ThreatList from './components/ThreatList';
import ThreatStats from './components/ThreatStats';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <LiveFeed />
      <Routes>
        <Route path="/" element={<ThreatList />} />
        <Route path="/stats" element={<ThreatStats />} />
        <Route path="/login" element={<Login onLogin={() => window.location.href = '/'} />} />
        <Route path="/register" element={<Register onRegisterSuccess={() => window.location.href = '/login'} />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/analyze"
          element={
            <PrivateRoute>
              <ThreatAnalysis />
            </PrivateRoute>
          }
        />
        <Route
          path="/find"
          element={
            <PrivateRoute>
              <FindById />
            </PrivateRoute>
          }
        />
        <Route
          path="/threats/:id"
          element={
            <PrivateRoute>
              <ThreatDetail />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
