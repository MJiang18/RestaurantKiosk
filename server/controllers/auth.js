const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
// const bcrypt = require('bcrypt');

exports.signUp = async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const { street, city, state, zipcode } = req.body.address;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      address: {
        street,
        city,
        state,
        zipcode,
      },
    });
    sendToken(user, 201, res);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

// login User
exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password is provided
  if (!email || !password) {
    return next(
      new ErrorResponse('Please provide an email and password.', 400),
    );
  }

  try {
    // check if user exists by email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorResponse('Invalid credentials.', 401));
    }

    // check if passwords match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials.', 401));
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};




const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ success: true, token });
};
