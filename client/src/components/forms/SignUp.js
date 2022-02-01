import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

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
  const [error, setError] = useState({});
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
      <form>
        <h1>Restaurant Kiosk</h1>
        <Link to='/update'>
          <button>Update</button>
        </Link>
        <Link to='/login'>
          <button>Login</button>
        </Link>
        <div className='border'>
          <div className='container'>
            <div className='form-control'>
              <p>
                <label>First Name:</label>

                <input
                  type='text'
                  placeholder='First Name'
                  value={firstName}
                  required
                  id='firstName'
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </p>
              <p>
                <label>Last Name:</label>

                <input
                  type='text'
                  placeholder='Last Name'
                  value={lastName}
                  required
                  id='lastName'
                  onChange={(e) => setLastName(e.target.value)}
                />
              </p>
              <p>
                <label>Email:</label>

                <input
                  type='text'
                  placeholder='Email'
                  value={email}
                  required
                  id='email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p>
                <label>Address:</label>

                <br />
                <label>Street:</label>

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
                <label>City:</label>

                <input
                  type='text'
                  placeholder='City'
                  value={city}
                  required
                  id='city'
                  onChange={(e) => setCity(e.target.value)}
                />
              </p>
              <p>
                <label>Zip Code</label>

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
                <label>State:</label>

                <input
                  type='text'
                  placeholder='State'
                  value={state}
                  required
                  id='state'
                  onChange={(e) => setState(e.target.value)}
                />
              </p>
              <p>
                <label>Password:</label>

                <input
                  type='password'
                  placeholder=' Password'
                  value={password}
                  required
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </p>
              <p>
                <label>Confirm Password:</label>

                <input
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  required
                  id='confirmPassword'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </p>
              <button onClick={onSubmitHandler}>Sign Up</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
