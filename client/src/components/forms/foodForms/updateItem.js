import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';



const UpdateItem = (props) => {
    const { id } = props;
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const params = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/restaurantKiosk/fooditem/${params.id}`)
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

        axios.put(`http://localhost:8000/api/restaurantKiosk/updateFood/${params.id}`, {
            name,
            price,
            description
        })
        .then(res => {
            console.log(res);
            navigate("/");
            
        })
        .catch(err => {
            console.log(err);
        });
    }
return (
    <div>
        <div>
            <Link to='/'>Home</Link>
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

export default UpdateItem;
