const AuthController = require("../controllers/auth.controller");

const { authenticate } = require("../config/jwt.config");
const OrderList = require("../models/food.models");

module.exports = function (app) {
  app.post("/signup", AuthController.signUp);
  app.post("/signIn", AuthController.signIn);
  app.get("/users", AuthController.getAllUsers);
  app.delete("/user/:userid", AuthController.deleteUser);
  
  
  //Food routes to create, get, update, and delete food
  app.post("/food/create", OrderList.createFood);
  // app.get("api/menu", OrderList.getAllFood);
  // app.get("api/food/:id", OrderList.getFoodById);
  // app.put("api/food/:id", OrderList.updateFood);
  // app.delete("api/food/:id", OrderList.deleteFood);
};
