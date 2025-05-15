import React, { useEffect } from 'react';
import signImage from '../assets/login.png';
import NavBar from '../NavBar/NavBar';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import './Login.css';

const LoginPage = () => {

	const { login } = useAuth();
	const navigate = useNavigate();

  const handleLogin = () => {
	const username = document.querySelector('input[type="text"]').value;
	login(username); // Use the entered username for login
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
		<div style={{ position: 'fixed', inset: 0, zIndex: -1, background: 'linear-gradient(to bottom, #dbeafe, #fef3c7, #bfdbfe)' }} />
		<div className="relative w-full h-full">
			<NavBar />
			<div className="login-wrapper">
				<div className="login-left">
					<img
						src={signImage}
						alt="Sign Language Image"
						style={{ width: '60vw', height: '60vh', objectFit: 'contain' }}
						className="sign-image"
					/>
				</div>
				<div className="login-right">
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
		</div>
	</>
);
};

export default LoginPage;
