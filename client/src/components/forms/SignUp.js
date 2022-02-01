import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setErrors] = useState({});
  let navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8000/signup', {
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        password,
        confirmPassword,
      })
      .then((res) => {
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate('/');
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
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
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {error.firstName ? (
                  <p class='error'>{error.firstName.message}</p>
                ) : (
                  true
                )}
              </p>
              <p>
                <label>Last Name:</label>
                <input
                  type='text'
                  onChange={(e) => setLastName(e.target.value)}
                />
                {error.lastName ? (
                  <p class='error'>{error.lastName.message}</p>
                ) : (
                  true
                )}
              </p>
              <p>
                <label>Email:</label>
                <input type='text' onChange={(e) => setEmail(e.target.value)} />
                {error.email ? (
                  <p class='error'>{error.email.message}</p>
                ) : (
                  true
                )}
              </p>
              <p>
                <label>Address:</label>
                <input
                  type='text'
                  onChange={(e) => setAddress(e.target.value)}
                />
                {error.address ? (
                  <p class='error'>{error.address.message}</p>
                ) : (
                  true
                )}
              </p>
              <p>
                <label>City:</label>
                <input type='text' onChange={(e) => setCity(e.target.value)} />
                {error.city ? <p class='error'>{error.city.message}</p> : true}
              </p>
              <p>
                <label>State:</label>
                <input type='text' onChange={(e) => setState(e.target.value)} />
                {error.state ? (
                  <p class='error'>{error.state.message}</p>
                ) : (
                  true
                )}
              </p>
              <p>
                <label>Password:</label>
                <input
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error.password ? (
                  <p class='error'>{error.password.message}</p>
                ) : (
                  true
                )}
              </p>
              <p>
                <label>Confirm Password:</label>
                <input
                  type='password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error.confirmPassword ? (
                  <p class='error'>{error.confirmPassword.message}</p>
                ) : (
                  true
                )}
              </p>
              <p>
                <button onClick={onSubmitHandler}>Sign Up</button>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
