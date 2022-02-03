const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
// const bcrypt = require('bcrypt');

exports.signUp = async (req, res, next) => {
  console.log(req.body.address);
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

//   User.create(request.body)
//     .then((user) => {
//       const userToken = jwt.sign(
//         {
//           id: user._id,
//         },
//         process.env.SECRET_KEY,
//       );
//       response
//         .cookie('userToken', userToken, secret, {
//           httpOnly: true,
//         })
//         .json({ msg: 'Success!', user: user });
//     })
//     .catch((error) => {
//       response.status(400).json(error);
//     });
// };

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

// module.exports.logOut = (request, response) => {
//   response.clearCookie('usertoken');
//   response.sendStatus(200);
// };

// module.exports.getAllUsers = (request, response) => {
//   User.find({})
//     .collation({ locale: 'en', strength: 2 })
//     .sort({ firstName: 1 })
//     .then((users) => response.json(users))
//     .catch((error) => response.json(error));
// };

// module.exports.deleteUser = (request, response) => {
//   User.deleteOne({ _id: request.params.userid })
//     .then((deletedConfirmation) => response.json(deletedConfirmation))
//     .catch((error) => response.json(error));
// };

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ success: true, token });
};
