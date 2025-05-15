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
						style={{ width: '50vw', height: '80vh', }}
						className="sign-image"
					/>
				</div>
				<div className="ml-[10vw] login-right">
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
						<div className='flex flex-col gap-2'>
							<button className='bg-[#49BBBD] w-full' onClick={handleLogin}>Đăng nhập</button>
							<hr style={{ border: 'none', borderTop: '3px solid #ccc', margin: '8px 0' }} />
							<button
								className="bg-white border border-gray-300 rounded flex items-center justify-center gap-2 px-6 py-2 shadow hover:bg-gray-100 transition"
								style={{ fontWeight: 500, fontSize: '1rem' }}
								onClick={handleLogin}
							>
								<img
									src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
									alt="Google logo"
									style={{ width: 24, height: 24 }}
								/>
								<span>Đăng nhập với Google</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
);
};

export default LoginPage;
