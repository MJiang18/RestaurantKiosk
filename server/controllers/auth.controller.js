const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secret } = require("../config/jwt.config");

module.exports.signUp = (request, response) => {
  User.create(request.body)
    .then((user) => {
      const userToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET_KEY
      );
      response
        .cookie("usertoken", userToken, secret, {
          httpOnly: true,
        })
        .json({ msg: "Success!", user: user });
    })
    .catch((error) => {
      response.status(400).json(error);
    });
};

module.exports.signIn = async (request, response) => {
  let { email, password } = request.body;
  const user = await User.findOne({ email: email });

  if (user == null) {
    return response.status(404).json({ error: "user not found" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return response.status(400).json({ error: "incorrect password" });
  }

  const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

  response
    .cookie("usertoken", userToken, secret, {
      httpOnly: true,
    })
    .json(user);
};

module.exports.logOut = (request, response) => {
  response.clearCookie("usertoken");
  response.sendStatus(200);
};
