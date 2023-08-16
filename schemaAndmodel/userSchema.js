const mongoose = require("mongoose");

const validator = require("validator");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw Error("Invalid Email");
      }
    },
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    trim: true,
  },
  profile:{
    type:String
  },
  collections: {
    type:Array
  },
});

const users = new mongoose.model("users", userSchema);

module.exports = users;
