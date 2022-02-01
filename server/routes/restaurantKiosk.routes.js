const AuthController = require("../controllers/auth.controller");

const { authenticate } = require("../config/jwt.config");

module.exports = function (app) {
  app.post("/signup", AuthController.signUp);
  app.post("/signIn", AuthController.signIn);
  app.get("/users", AuthController.getAllUsers);
  app.delete("/user/:userid", AuthController.deleteUser);
};
