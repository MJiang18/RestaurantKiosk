import React, {useState, useEffect} from "react";
import axios from "axios";


const CreateFood = (props) => {
    
    const [foodName, setFoodName] = useState("")
    const [foodPrice, setFoodPrice] = useState("")
    const [foodDescription, setFoodDescription] = useState("")

    const submitHandlerFood = (e) => {

        e.preventDefault();

        axios.post("http://localhost:8000/api/food/create", {
        foodName,
        foodPrice,
        foodDescription
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            //upon successful post
            setFoodName("");
            setFoodPrice("");
            setFoodDescription("");
        })
        .catch(err => {
            console.log(err);
        });

}

return (
    <div>
        <header>
            <h1>Create Food</h1>
        </header>

        <form onSubmit={submitHandlerFood}>
            <div classname="form-fields">
                <label>Food Name</label>
                <input 
                onChange={(e) => setFoodName(e.target.value)}
                value={foodName}
                name="foodName" 
                type="text" 
                 />

            </div>
            <div classname="form-fields">
                <label>Price: </label>
                <input 
                onChange={(e) => setFoodPrice(e.target.value)}
                value={foodPrice}
                name="foodPrice" 
                type="number" 
                 />

            </div>
            <div classname="form-fields">
                <label>Description: </label>
                <input 
                onChange={(e) => setFoodDescription(e.target.value)}
                value={foodDescription}
                name="foodDescription" 
                type="text" 
                 />

            </div>
            <input className="submit-input" type="submit" value="Create" />

        </form>
    </div>
);
};

export default CreateFood;


