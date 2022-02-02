const Food = require("../models/food.models");


module.exports.createFood = (request, response) => {
    Food.create(request.body)
        .then((food) => {
            response.json(food);
        })
        .catch((error) => {
            response.json(error);
        });
};

module.exports.getAllFood = (request, response) => {
    Food.find({})
        .then((food) => {
            response.json(food);
        })
        .catch((error) => {
            response.json(error);
        });
};

module.exports.getFoodById = (request, response) => {
    Food.findById(request.params.id)
        .then((food) => {
            response.json(food);
        })
        .catch((error) => {
            response.json(error);
        });
};

module.exports.updateFood = (request, response) => {
    Food.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
    })
        .then((food) => {
            response.json(food);
        })
        .catch((error) => {
            response.json(error);
        });
};

module.exports.deleteFood = (request, response) => {
    Food.findByIdAndDelete(request.params.id)
        .then((food) => {
            response.json(food);
        })
        .catch((error) => {
            response.json(error);
        });
};

