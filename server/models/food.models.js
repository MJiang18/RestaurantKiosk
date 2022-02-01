const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
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
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
