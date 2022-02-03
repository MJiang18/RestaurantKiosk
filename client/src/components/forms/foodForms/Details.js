import { useNavigate, Link } from 'react-router-dom';
import React, { useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import './details.css';


// import './update.css';

const  Details= (props) => {
  const params = useParams();
  const { id } = props;
  const [name, setName] = useState('name');
  const [price, setPrice] = useState('price');
  const [description, setDescription] = useState('description');
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

 const [food, setFood] = useState([]);
  const [like, setLike] = useState(0);
  
  const remove = (id) => {
    axios
      .delete(`http://localhost:8000/api/restaurantKiosk/deleteFood/${params.id}`)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => console.log(err));
  };


 useEffect(() => {
    axios
      .get(`http://localhost:8000/api/restaurantKiosk/fooditem/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setPrice(res.data.price);
        setDescription(res.data.description);
      })
      .catch((err) => console.log(err));
  }, [id]);
   const Like = (e) => {
    setLike(like + 1);
  };


  return (
<div className='detail-container'>
      <div className='top-navbar'>
        <div className='create-navbar'>
          
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
        <div className='top-words'>
          <h1></h1>
          <h2> Dish Name: {name}</h2>
        </div>
        <div className='adopt-button'>
          <div className='adopt-control'>
            
            <button
              onClick={(e) => {
                remove(food._id);
              }}
            >
              Purchase {name}
            </button>
          </div>
        </div>
      </div>
      <div className='bottom-box'>
        <h3> Dish: {price}</h3>
        <h3>Description: {description}</h3>
        
        <div className='like-button'>
          
          <h3 style={{ display: 'inline-block', marginTop: '7px' }}>
            {like} like(s)
          </h3>
        </div>
        <button
            style={{ marginRight: '20px' }}
            onClick={(e) => Like()}
            className='button is-primary is-outlined'
          >
            Like {food.name}
          </button>
      </div>
    </div>
  );
};












//     <form>
//       <div className='home-link'>
       
//       </div>
//       <div className='box'>
//         <div className='border'>
//           <div className='container'>
//             <div className='form-control'>
//                 <label>Dish Name:</label>
//               <h3>{name}</h3>
//                 <label>Food Price:</label>
//               <h3>{price}</h3>
//                 <label>Food Description:</label>
//                 <h3>{description}</h3>
//             </div>
//            <button required id = 'menu'><Link to={'/'}>Menu</Link></button>
//             </div>
//           </div>
//         </div>
//     </form>
//   )
// }

export default Details;
