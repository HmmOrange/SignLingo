
import { Link } from 'react-router-dom'

function Login() {
    return (
			<>
				<div class="nav">
					<div class="container">
						<Link to="/">
							<div class="btn">Home</div>
						</Link>
						<Link to="/login">
							<div class="btn">Login</div>
						</Link>
					</div>
				</div>
				
				<div>
					<h1>Login Page</h1>
					<p>Welcome! Please log in.</p>
				</div>
			</>
    );
  }
  
export default Login;