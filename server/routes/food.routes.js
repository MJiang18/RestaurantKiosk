const FoodController = require('../controllers/food.controller');

module.exports = function (app) {
    //Food routes to create, get, update, and delete food
    app.post('api/food/create', FoodController.createFood);
    app.get('api/menu', FoodController.getAllFood);
    app.get('api/food/:id', FoodController.getFoodById);
    app.put('api/food/:id', FoodController.updateFood);
    app.delete('api/food/:id', FoodController.deleteFood);
};