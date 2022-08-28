const mongoose = require("mongoose");
const { Schema } = mongoose;
const Authentic_College_Schema = new Schema({
  applicationnumber: {
    type: String,
    required: true,
  },
  universityname: {
    type: String,
    required: true,
  },
  ownership: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: Number,
    required: true,
    unique: true,
  },
  about: {
    type: String,
    required: true,
  },
  courses: [
    {
      type: String,
      required: true,
    },
  ],
  intake: {
    type: Number,
    required: true,
  },
});

const Authentic_College = mongoose.model(
  "Authentic-Colleges",
  Authentic_College_Schema
);
module.exports = Authentic_College;
