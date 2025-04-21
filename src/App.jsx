import { useState } from 'react'
import { Link } from 'react-router-dom'
import signLogo from './assets/logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="nav">
        <div className="container">
          <Link to="/">
            <img src={signLogo} alt="Logo" style={{ height: '40px' }} />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/">
              <div className="btn">Home</div>
            </Link>
            <Link to="/login">
              <div className="btn">Login</div>
            </Link>
          </div>
        </div>
      </div>


      <div>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
          <img src={signLogo} className="logo" alt="Sign logo" />
        </a>
      </div>
      <h1>SignLingo</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
