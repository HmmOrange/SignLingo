import { useAuth } from '../contexts/AuthContext';
import signLogo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import '../index.css'; 
import './NavBar.css';
import avatarImg from '../assets/avatar.png';

function NavBar() {
  const { user } = useAuth();

  return (
    <div className="navzz">
      <div className="containerzz">
        <Link to="/">
          <img src={signLogo} alt="Logo" style={{ height: '40px' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/"><div className="navzz-btn">Home</div></Link>
          <Link to="/study"><div className="navzz-btn  ">Study</div></Link>
          <Link to="/dictionary"><div className="navzz-btn  ">Dictionary</div></Link>
          <Link to="/translator"><div className="navzz-btn  ">Translator</div></Link>
          {/* <Link to="/login"><div className="nav-btn">Login</div></Link> */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {user ? (
              <div className="navzz-profile" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src={avatarImg}
                  alt="Profile"
                  style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                />
                <span style={{width: '80px', alignItems: 'center', fontWeight: '500'}}>{user.name}</span>
              </div>
            ) : (
              <Link to="/login"><div className="navzz-btn">Login</div></Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;