import React, { useEffect } from 'react';
import signImage from '../assets/login.png';
import NavBar from '../NavBar/NavBar';
import '../index.css'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {

	const { login } = useAuth();
	const navigate = useNavigate();

  const handleLogin = () => {
    login('abc'); // Simulate login with a temp username
		navigate("/");
  };
	
	useEffect(() => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = '/css/Login.css'; // Đảm bảo file này được phục vụ đúng từ public/css
		document.head.appendChild(link);
	
		return () => {
		  document.head.removeChild(link);
		};
	  }, []);

  return (
		<>
			<NavBar>
			</NavBar>
			
			<div className="login-wrapper">
				<div className="login-left">
					<img src={signImage} alt="Sign Language Image" />
				</div>

				<div className="login-right">
					<h2>Chào mừng đến với :v</h2>

					<div className="login-tabs">
						<button className="active">Đăng nhập</button>
						<button className="inactive">Đăng ký</button>
					</div>

					<div className="login-form">
						<label>Tên đăng nhập</label>
						<input type="text" placeholder="Nhập tên đăng nhập" />

						<label>Mật khẩu</label>
						<div className="password-box">
							<input type="password" placeholder="Nhập mật khẩu" />
							<span className="eye-icon">👀</span>
						</div>

						<div className="login-options">
							<label><input type="checkbox" /> Ghi nhớ tôi</label>
							<a href="#">Quên mật khẩu?</a>
						</div>

						<div className='login-confirm'>
							<button onClick={handleLogin}>Đăng nhập</button>
						</div>
					</div>
				</div>
			</div>
		
		</>
  );
};

export default LoginPage;
