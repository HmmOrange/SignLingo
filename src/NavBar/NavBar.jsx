import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../index.css'; 
import './NavBar.css';

function NavBar() {
  return (
    <div className="nav">
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: '40px' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/"><div className="nav-btn">Home</div></Link>
          <Link to="/login"><div className="nav-btn">Login</div></Link>
          <Link to="/dictionary"><div className="nav-btn  ">Dictionary</div></Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
