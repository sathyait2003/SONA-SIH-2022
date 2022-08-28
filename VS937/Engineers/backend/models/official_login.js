const mongoose = require("mongoose");
const { Schema } = mongoose;
const Official_Login_Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Official_Login = mongoose.model("Official-Logins", Official_Login_Schema);
module.exports = Official_Login;
