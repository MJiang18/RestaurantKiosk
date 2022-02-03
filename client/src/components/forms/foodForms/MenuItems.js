import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const MenuItems = (props) => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/restaurantKiosk/foodItems/')
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                setMenuItems(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <Link to='/'>Home</Link>
            <header>
                <div>
                    <h1>Meals for Sale</h1>
                </div>
            </header>
            <table>
                <thead >
                    <tr>
                    <th>Meal Item</th>
                    </tr>
                    <tr>
                    <th>Price</th>
                    </tr>
                    <tr>
                    <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        menuItems.map((item, i) => {
                            (<tr key={i}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>
                                    <Link to={`/food/${item._id}`}>Edit</Link>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )


}

export default MenuItems;
