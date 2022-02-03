import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CreateFood = (props) => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const submitHandlerFood = (e) => {
            
            e.preventDefault();
    
            axios.post("http://localhost:8000/api/restaurantKiosk/addFood", {
            name,
            price,
            description
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
                //upon successful post
                setName("");
                setPrice("");
                setDescription("");
            })
            .catch(err => {
                console.log(err);
            });
    
        }
        return (
            <div>
                <div>
                <Link to='/login'>login</Link> ||
                <Link to='/'>Home</Link>
                </div>
                <header>
                    <h1>Create Food</h1>
                </header>

                <form onSubmit={submitHandlerFood}>
                    <div className="form-fields">
                        <label>Food Name</label>
                        <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        name="name"
                        type="text" 

                        />
                    </div>
                    <div className="form-fields">
                        <label>Price: </label>
                        <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        name="price"
                        type="number"

                        />
                    </div>
                    <div className="form-fields">
                        <label>Description: </label>
                        <input
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        name="description"
                        type="text"

                        />
                    </div>
                    <input className="submit-input" type="submit" value="Create" />
                </form>
            </div>
    );
};

export default CreateFood;