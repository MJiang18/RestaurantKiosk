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
      street: String,
      city: String,
      state: String,
      zipcode: String,
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
  if (this.isModified("password")) {
    if (this.password !== this._confirmPassword) {
      this.invalidate("confirmPassword", "Passwords do not match");
    }
  }
  next();
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
