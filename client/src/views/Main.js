import React, {useState} from "react";
import axios from "axios";
import CreateFood from "./createFood";
import MenuItems from "./menuItem";


const Menu = (props) => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/food/")
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

export default Menu;
