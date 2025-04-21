import { Link } from 'react-router-dom';
import logo from './assets/logo.svg';
import './index.css';  // Your existing CSS for nav

function NavBar() {
  return (
    <div className="nav">
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: '40px' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/"><div className="btn">Home</div></Link>
          <Link to="/login"><div className="btn">Login</div></Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
