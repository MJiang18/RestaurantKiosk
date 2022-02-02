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

module.exports.getAllUsers = (request, response) => {
  User.find({})
    .collation({ locale: "en", strength: 2 })
    .sort({ firstName: 1 })
    .then((users) => response.json(users))
    .catch((error) => response.json(error));
};

module.exports.deleteUser = (request, response) => {
  User.deleteOne({ _id: request.params.userid })
    .then((deletedConfirmation) => response.json(deletedConfirmation))
    .catch((error) => response.json(error));
};

module.exports.updateUser = async (request, response) => {
  const user = await User.findById({ _id: request.params.userid });

  if (!user) {
    return response.status(404).json("User not found");
  }

  const samePassword = await bcrypt.compare(
    request.body.password,
    user.password
  );

  if (!samePassword) {
    user.password = request.body.password;
    user._confirmPassword = request.body.password;
  }

  user.firstName = request.body.firstName;
  user.lastName = request.body.lastName;
  user.email = request.body.email;
  user.address = request.body.address;
  user
    .save()
    .then((updatedUser) => {
      response.json(updatedUser);
    })
    .catch((error) => response.status(400).json(error));
};
