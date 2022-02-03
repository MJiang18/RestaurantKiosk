import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './createFood.css';

const CreateFood = (props) => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    let navigate = useNavigate();
      useEffect(() => {
    try {
      if (!localStorage.getItem('token')) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  });

    const submitHandlerFood = async  (e) => {      
            e.preventDefault();
    
        const make = await  axios.post("http://localhost:8000/api/restaurantKiosk/addFood", {
            name,
            price,
            description
            })
            .then(res => {
                console.log(res.data);
                //upon successful post
                setName("");
                setPrice("");
                setDescription("");
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            });
    
        }
        return (
            <div className='create-container'>
                <div className='create-navbar'>
        <h1>Restaurant Kiosk</h1>
    <div className='create-nav-buttons'>
          <button required id = 'register'>
        <Link  to='/'>Menu</Link>
          </button>
          <button required id = 'register'>
        <Link  to='/addFoodpage'>Create</Link>
          </button>
          </div>
        </div>
           <div className='create-input-container'>
                <div className='create-box'>
                    <h1>Create Food</h1>
                
                <form onSubmit={submitHandlerFood}>
                        <h2>Any food ideas?</h2>
                        <div className="create-food-input">
                    <div className="form-fields">

                        <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        name="name"
                        type="text" 
                        placeholder='Name'
                        />
                        </div>
                    
                    <div className="form-fields">
                      
                        <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        name="price"
                        type="number"
                        placeholder='Price'

                        />
                    </div>
                    <div className="form-fields">
                        
                        <input
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        name="description"
                        placeholder='Description'
                        type="text"
                        
                        />
                        </div>
                    <button type="submit">Submit</button>
                        </div>
                       
                </form>
                </div>
                        </div>
            </div>
    );
};

export default CreateFood;