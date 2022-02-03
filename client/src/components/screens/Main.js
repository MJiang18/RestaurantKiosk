import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './main.css';


const Main = (props) => {
  const [error, setError] = useState('');
  const [foodList, setFoodList] = useState([]);
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
        const { data, user } = await axios.get('http://localhost:8000/api/private', config);
        setPrivateName(data.user);
        axios.get('http://localhost:8000/api/restaurantKiosk/fooditems/').then((res) => {
          setFoodList(res.data);
          // console.log(res.data._id);
        });
      } catch (error) {
        localStorage.removeItem('token');
        setError('You are not authorized please login');
        navigate('/login');
      }
    };
    fetchPrivateData();
  }, []);
  const removeFromDom = (foodId) => {
    setFoodList(foodList.filter((food) => food._id !== foodId));
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='mainscreen-container'>
      <div className='main-navbar'>
        <h1>Restaurant Kiosk</h1>
    <div className='main-nav-buttons'>
          <button required id = 'register'>
        <Link  to='/'>Menu</Link>
          </button>
          <button required id = 'register'>
        <Link  to='/addFoodpage'>Create</Link>
          </button>
          </div>
        </div>
      <div>
        <div className='main-box'>
      <h1>Welcome {privateName}</h1>
          <div className='main-container'>
            <div className='table'>
              <table>
                <thead>
                  <tr>
                    <th>Food</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {foodList.map((food, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{food.name}</td>
                        <td>
                          <Link to={'/food/' + food._id + '/edit'}> Details</Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className='form-control'></div>
            </div>
<button onClick={logoutHandler}>Logout </button>
          </div>
          {foodList[0] ? (
            <div>
              {foodList.map((food, index) => {
                return (
                  <div key={index}>
                    <Link to={`/${food._id}`}>{food.title}</Link>
                  </div>
                );
              })}
            </div>
          ) : (
            ''
            )}
        </div>
      </div>
      {error ? (
        <span>{error}</span>
        ) : (
          <>
          <div>{privateData}</div>
        </>
      )}
    </div>
  );
};

export default Main;