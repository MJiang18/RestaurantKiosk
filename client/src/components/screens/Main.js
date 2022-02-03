import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const Main = () => {
  const [error, setError] = useState('');
  const [privateData, setPrivateData] = useState('');
  const [privateName, setPrivateName] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      try {
        const { data, user } = await axios.get(
          'http://localhost:8000/api/private',
          config,
        );
        console.log(data);
        setPrivateName(data.user);
      } catch (error) {
        localStorage.removeItem('token');
        setError('You are not authorized please login');
        navigate('/login');
      }
    };
    fetchPrivateData();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <div>
        <h1>Welcome {privateName}</h1>
        {error ? (
          <span>{error}</span>
        ) : (
          <>
            <div>{privateData}</div>
          </>
        )}
        <div className="navbar">

          <Link to={'/menu'}>Menu</Link> ||
          <Link to={'/shoppingCart'}>Detailed Task</Link>
          <Link to={'/Account'}>Detailed Task</Link>
          <button onClick={logoutHandler}>Logout </button>
        </div>
      </div>
      <Link to='/signup'>signup</Link>
    </div>
  );
};

export default Main;
