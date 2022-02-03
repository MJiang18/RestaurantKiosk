import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';;

const UpdateFood = (props) => {
    const { id } = props;
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/food/edit/${id}`)
        .then((res) => {
            const food = res.data;
            setName(food.name);
            setPrice(food.price);
            setDescription(food.description);
        })
        .catch(err => {
            console.log(err);
        });
    }, [id]);

    const editHandlerFood = (e) => {

        e.preventDefault();

        axios.put(`http://localhost:8000/api/food/edit/${id}`, {
            name,
            price,
            description
        })
        .then(res => {
            console.log(res);
            navigator("/menu");
            
        })
        .catch(err => {
            console.log(err);
        });
    }


return (
    <div>
        <div>
            <Link to='/login'>login</Link> ||
            <Link to='/home'>Home</Link>
            <header>
                <h1>Update Food</h1>
            </header>
            <form onSubmit={editHandlerFood}>
                <div className="form-fields">
                    <label> Name: </label>
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-fields">
                    <label> Price: </label>
                    <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-fields">
                    <label> Description: </label>
                    <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div>
                    <button type="submit">Update</button>
                </div>
            
            </form>
        </div>
    </div>

    );
};

export default UpdateFood;
