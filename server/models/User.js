const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter your first name'],
      minLength: [2, 'First names must be 2 characters or longer'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your last name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please enter a secure password'],
      minLength: [8, 'Password must be 8 characters or longer'],
    },
    address: {
      street: {
        type: String,
        required: [true, 'Please enter your street address'],
        minLength: [2, 'Street names must be 2 characters or longer'],
      },
      city: {
        type: String,
        required: [true, 'Please enter your city of residence'],
        minLength: [2, 'City names must be 2 characters or longer'],
      },
      state: {
        type: String,
        required: [true, 'Please enter your state of residence'],
        minLength: [2, 'State names must be 2 characters or longer'],
      },
      zipcode: {
        type: String,
        required: [true, 'Please enter your zipcode of residence'],
        minLength: [5, 'Zipcode must be 5 numbers or longer'],
      },
    },
  },
  { timestamps: true },
);

// UserSchema.virtual('confirmPassword')
//   .get(function () {
//     return this._confirmPassword;
//   })
//   .set(function (value) {
//     this._confirmPassword = value;
//   });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
  );
};
const User = mongoose.model('User', UserSchema);

module.exports = User;
