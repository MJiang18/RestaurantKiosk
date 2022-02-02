const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      minLength: [2, "First names must be 2 characters or longer"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email address"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Please enter a secure password"],
      minLength: [8, "Password must be 8 characters or longer"],
    },
    address: {
      street: {
        type: String,
        required: [true, "Please enter your street address"],
        minLength: [2, "Street names must be 2 characters or longer"],
      },
      city: {
        type: String,
        required: [true, "Please enter your city of residence"],
        minLength: [2, "City names must be 2 characters or longer"],
      },
      state: {
        type: String,
        required: [true, "Please enter your state of residence"],
        minLength: [2, "State names must be 2 characters or longer"],
      },
      zipcode: {
        type: String,
        required: [true, "Please enter your zipcode of residence"],
        minLength: [5, "Zipcodes must be 5 numbers or longer"],
      },
    },
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

UserSchema.pre("validate", function (next) {
  console.log("VALIDATING");
  if (this.isModified("password")) {
    if (this.password !== this._confirmPassword) {
      this.invalidate("confirmPassword", "Passwords do not match");
    }
  }
  next();
});

UserSchema.pre("save", function (next) {
  console.log("pre save");
  console.log(this.isModified("password"));
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
