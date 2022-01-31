const mongoose = require("mongoose");

const Food = require("./food.models");

const ShoppingCartSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
  },
  { items: [{ type: mongoose.Schema.ObjectId, ref: "Food" }] },
  { timestamps: true }
);

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema);
