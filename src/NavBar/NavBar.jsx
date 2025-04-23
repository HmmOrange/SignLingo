import { useAuth } from '../contexts/AuthContext';
import signLogo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import '../index.css'; 
import './NavBar.css';

function NavBar() {
  const { user } = useAuth();

  return (
    <div className="nav">
      <div className="container">
        <Link to="/">
          <img src={signLogo} alt="Logo" style={{ height: '40px' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/"><div className="nav-btn">Home</div></Link>
          <Link to="/dictionary"><div className="nav-btn  ">Dictionary</div></Link>
          {/* <Link to="/login"><div className="nav-btn">Login</div></Link> */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {user ? (
              <div className="nav-profile" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src={user.avatar}
                  alt="Profile"
                  style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                />
                <span style={{width: '80px', alignItems: 'center', fontWeight: '500'}}>{user.name}</span>
              </div>
            ) : (
              <Link to="/login"><div className="nav-btn">Login</div></Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;