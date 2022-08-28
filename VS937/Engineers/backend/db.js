const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/signup";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected Successfully To Mongo DB");
  });
};

module.exports = connectToMongo;
