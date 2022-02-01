import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  return (
    <div>
      THIS IS THE LOGIN PAGE
      <Link to='/signup'>Sign Up</Link>
    </div>
  );
};

export default Login;
