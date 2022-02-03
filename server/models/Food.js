const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    price: {
      type: Number,
    },

    description: {
      type: String,
    },
  },
  { timestamps: true },
);

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;
