const Food = require("../models/food.models");

module.exports = {


    createFood = (request, response) => {
    Food.create(request.body)
        .then((newfood) => {
            response.json(newfood);
        })
        .catch((error) => {
            console.log(error);
            response.json(error);
        });
    },

    getAllFood = (request, response) => {
    Food.find({})
        .then((food) => {
            response.json(food);
        })
        .catch((error) => {
            console.log(error);
            response.json(error);
        });
    },

    getFoodById = (request, response) => {
    Food.findById(request.params.id)
        .then((food) => {
            response.json(food);
        })
        .catch((error) => {
            console.log(error);
            response.json(error);
        });
    },

    updateFood = (request, response) => {
    Food.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
    })
        .then((food) => {
            response.json(food);
        })
        .catch((error) => {
            console.log(error);
            response.json(error);
        }); 
    },

    deleteFood = (request, response) => {
    Food.findByIdAndDelete(request.params.id)
        .then((food) => {
            response.json(food);
        })
        .catch((error) => {
            console.log(error);
            response.json(error);
        });
    },

}