const FoodItems = require('../models/food.models');

module.exports = {
    createFooditems: (req, res) => {
        FoodItems.create(req.body)
            .then(fooditems => res.json(fooditems))
            .catch(err => res.json(err));
    },
    getFooditems: (req, res) => {
        FoodItems.find()
            .then(fooditems => res.json(fooditems))
            .catch(err => res.json(err));
    },
    getFooditem: (req, res) => {
        FoodItems.findById(req.params.id)
            .then(fooditems => res.json(fooditems))
            .catch(err => res.json(err));
    },
    updateFooditem: (req, res) => {
        FoodItems.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(fooditems => res.json(fooditems))
            .catch(err => res.json(err));
    },
    deleteFoodItem: (req, res) => {
        FoodItems.findByIdAndRemove(req.params.id)
            .then(fooditems => res.json(fooditems))
            .catch(err => res.json(err));
    }
};
