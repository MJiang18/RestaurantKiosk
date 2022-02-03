import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/')
    }
  }, [navigate])

  const loginHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      } 
    }
    try{
      const {data} = await axios.post('http://localhost:8000/api/restaurantKiosk/signin', {email, password},
      config
      )
      localStorage.setItem('token', data.token)
      navigate('/')
  }catch (error){
    setError(error.response.data.error)
    setTimeout(() => {
      setError(' ');
    }, 5000)
  }
}
  return (
    <div className='login1st-container'>
    <form onSubmit={loginHandler}>
    <div className='login-navbar'>
    <h1>Restaurant Kiosk</h1>
    <div className='login-nav-buttons'>
          <button required id = 'register'>
        <Link to='/login'>
          Login
        </Link>
          </button>
        <button>
        <Link  to='/signup'>Register
        </Link>
          </button>
          </div>
        </div>
        <div className='login-container'>
          <h1>Welcome Back!</h1>
           <div className='border'>
        <div className='input-fields-name'>
          <div className="login-input-container">

              <input
                type='email'
                required
                id='email'
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                tabIndex={1}
                />
                <input
                  type='password'
                  required
                  id='password'
                  autoComplete='"true"'
                  placeholder='Enter Password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  tabIndex={2}
                  />
                  </div>
                  </div>
                  <div className="footer">

      <button type='submit'>Login</button>
      Don't have an account? <Link to='/signup'>Sign Up</Link>
                  </div>
      </div>
      </div>
      </form>
    </div>
  );
};

export default Login;
