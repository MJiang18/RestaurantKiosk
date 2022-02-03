import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const MenuItems = (props) => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/food/')
            .then(res => {
                console.log(res);
                console.log(res.data);
                setMenuItems(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <header>
                <div>
                    <h1>Meals for Sale</h1>
                </div>
            </header>
            <table style={{margin: "auto", border: "1px solid black"}}>
                <thead style={{backgroundColor: "lightgray", color: "white"}}>
                    <th>Meal Item</th>
                    <th>Price</th>
                    <th>Description</th>
                </thead>
                <tbody>
                    {
                        menuItems.map((item, i) => {
                            (<tr key={i}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )


}

export default MenuItems;
