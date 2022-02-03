import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState([]);
  let navigate = useNavigate();
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError('Passwords do not match');
    }

    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/restaurantKiosk/signup',
        {
          firstName,
          lastName,
          password,
          confirmPassword,
          email,
          address: {
            street,
            city,
            state,
            zipcode,
          },
        },
        config,
      );
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div>
        <div className='navbar'>
        <h1>Restaurant Kiosk</h1>
    <div className='nav-buttons'>
          <button required id = 'register'>
        <Link  to='/signup'>Register</Link>
          </button>
          <button>
        <Link to='/login'>
          Login
        </Link>
          </button>
          </div>
        </div>
        <div className='signup'>

    <form onSubmit={onSubmitHandler}>
          <div className='signup-container'>
        <h1>Sign Up!</h1>
        <div className='border'>
          <div className='input-fields-name'>
       <p>
                <input
                  type='text'
                  placeholder='First Name'
                  value={firstName}
                  required
                  id='firstName'
                  onChange={(e) => setFirstName(e.target.value)}
                  />
                {error}
                  </p>
              <p>
                <input
                  type='text'
                  placeholder='Last Name'
                  value={lastName}
                  required
                  id='lastName'
                  onChange={(e) => setLastName(e.target.value)}
                  />
                  </p>
                  </div>
                  <div className='form-control'>
              <p>
                <input
                  type='text'
                  placeholder='Email'
                  value={email}
                  required
                  id='email'
                  onChange={(e) => setEmail(e.target.value)}
                  />
              </p>
                </div>
                <div className='container-state'>

                <h3>    Address     </h3>
                          <div className='input-fields-street'>
              <p>
                <input
                  type='text'
                  placeholder='Street'
                  value={street}
                  required
                  id='street'
                  onChange={(e) => setStreet(e.target.value)}
                  />
              </p>
              <p>
                <input
                  type='text'
                  placeholder='State'
                  value={state}
                  required
                  id='state'
                  onChange={(e) => setState(e.target.value)}
                  />
              </p>
                  
                  </div>
                  </div>
                  <div className='input-fields-zip'>
           
              <p>
                
                <input
                  type='text'
                  placeholder='Zip Code'
                  value={zipcode}
                  required
                  id='zipcode'
                  onChange={(e) => setZipcode(e.target.value)}
                  />
              </p>
              <p>
               
                 <select  required id='citys' onChange={(e) => setCity(e.target.value)} >
                  <option value='city'>City</option>
                  <option value='columbus'>columbus</option>
                  <option value='New York'>New York</option>
                  <option value='Seattle'>Seattle</option>
                  <option value='Lexington'>Lexington</option>
                  <option value='Ann Harbor'>Ann Harbor</option>
                  <option value='Chicago'>Chicago</option>
                  <option value='Washington D.C.'>Washington D.C.</option>
                  <option value='Los Angeles'>Los Angeles</option>
                  <option value='Atlanta'>Atlanta</option>
                  <option value='Nashville'>Nashville</option>
                  <option value='New Orleans'>New Orleans</option>
                  <option value='Tampa Bay'>Tampa Bay</option>
                  <option value='Portland'>Portland</option>
                </select>
              </p>
                   
                    </div>

                <div className='form-control'>
                    <div className='input-fields-password'>
              <p>
          

                <input
                  type='password'
                  placeholder=' Password'
                  value={password}
                  required
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                  />
              </p>
                  </div>
                  <div className='form-control'>
              <p>
             

                <input
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  required
                  id='confirmPassword'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  />
              </p>
                  </div>
                  </div>
              <button type='submit' >Sign Up</button>
              
          </div>
        </div>
      </form>
    </div>
                  </div>
  );
};

export default SignUp;
