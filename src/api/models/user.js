const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: "string",
    required: true,
    unique: true,
    maxlength: 35,
    minlength: 4,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  name: {
    type: "string",
    required: true,
  },
  surname: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
    minlength: 6,
  },
  blocked: {
    type: "boolean",
    default: false,
  },
});

module.exports = mongoose.model("User", User);
