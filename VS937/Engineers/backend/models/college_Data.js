const mongoose = require("mongoose");
const { Schema } = mongoose;
const College_Data_Schema = new Schema({
  applicationnumber: {
    type: String,
    required: true,
  },
  universityname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  website: {
    type: String,
    required: true,
  },
  programmes: [
    {
      type: String,
      required: true,
    },
  ],
  others: {
    type: String,
  },
  uploadlink1: {
    type: String,
  },
  nba: {
    type: String,
  },
  uploadlink2: {
    type: String,
  },
  naac: {
    type: String,
  },
  uploadlink3: {
    type: String,
  },
  otheraccre: {
    type: String,
  },
  uploadlink4: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const College_Data = mongoose.model("Colleges-Data", College_Data_Schema);
module.exports = College_Data;
