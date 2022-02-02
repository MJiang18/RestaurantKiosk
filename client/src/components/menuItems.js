import React, {useState, useEffect} from "react";
import axios from "axios";

const MenuItems = (props) => {
    
        const [foods, setFoods] = useState([]);
    
        useEffect(() => {
            axios.get("http://localhost:8000/api/menu/")
            .then(res => {
                console.log(res);
                console.log(res.data);
                setFoods(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        }, []);
    
        return (
            <div>
                <header>
                    <h1>Menu Items</h1>
                </header>
                <div className="menu-items">
                    {foods.map(food => {
                        return (
                            <MenuItem 
                            key={food.id}
                            food={food}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }

    export default MenuItems;