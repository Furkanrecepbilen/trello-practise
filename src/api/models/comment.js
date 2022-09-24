const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comments = new Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  user: {
    type: Object,
    ref: "user",
  },
  todo: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "todo",
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = mongoose.model("Comments", Comments);
