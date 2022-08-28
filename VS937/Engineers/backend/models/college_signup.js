const mongoose = require("mongoose");
const { Schema } = mongoose;
const College_Signup_Schema = new Schema({
  universityname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const College_Signup = mongoose.model(
  "Colleges-Signups",
  College_Signup_Schema
);
module.exports = College_Signup;
