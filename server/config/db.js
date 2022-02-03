const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connected to monogoDB");
};
module.exports = connectDB;
