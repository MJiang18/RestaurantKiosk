const AuthController = require("../controllers/auth.controller");

const { authenticate } = require("../config/jwt.config");

module.exports = function (app) {
  app.post("/signup", AuthController.signUp);
  app.post("/signIn", AuthController.signIn);
  app.get("/users", AuthController.getAllUsers);
  app.put("/user/:userid", AuthController.updateUser);
  app.delete("/user/:userid", AuthController.deleteUser);
};
