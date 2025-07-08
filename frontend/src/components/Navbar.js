import { Link, useNavigate } from 'react-router-dom';

// ►–– Styles –––––––––––––––––––––––––––––––
const navStyle = {
  padding: '10px 20px',
  background: '#1e1e2f',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const linkContainerStyle = {
  display: 'flex',
  gap: '15px',
  flexWrap: 'wrap',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 500,
  padding: '8px 12px',
  borderRadius: '4px',
  transition: 'background 0.3s ease',
};

const hoverBg = '#3e3e55';

const buttonStyle = {
  ...linkStyle,
  background: '#d9534f',
  cursor: 'pointer',
  border: 'none',
};

// ►–– Component ––––––––––––––––––––––––––––
const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Helper to add hover effect
  const addHover = (e) => (e.target.style.background = hoverBg);
  const removeHover = (e) => (e.target.style.background = 'transparent');

  return (
    <nav style={navStyle}>
      <div style={{ fontWeight: 'bold', color: '#00d4ff', fontSize: '18px' }}>
        Threat Dashboard
      </div>
      

      <div style={linkContainerStyle}>
        <Link to="/" style={linkStyle} onMouseEnter={addHover} onMouseLeave={removeHover}>
          Home
        </Link>
        <Link to="/stats" style={linkStyle} onMouseEnter={addHover} onMouseLeave={removeHover}>
          Threat Stats
        </Link>
        <Link to="/find" style={linkStyle} onMouseEnter={addHover} onMouseLeave={removeHover}>
          Find by ID
        </Link>
        <Link to="/analyze" style={linkStyle} onMouseEnter={addHover} onMouseLeave={removeHover}>
          Analyze
        </Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login" style={linkStyle} onMouseEnter={addHover} onMouseLeave={removeHover}>
              Login
            </Link>
            <Link
              to="/register"
              style={linkStyle}
              onMouseEnter={addHover}
              onMouseLeave={removeHover}
            >
              Register
            </Link>
          </>
        ) : (
          <button
            style={buttonStyle}
            onClick={logout}
            onMouseEnter={(e) => (e.target.style.background = '#c9302c')}
            onMouseLeave={(e) => (e.target.style.background = '#d9534f')}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
