const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Todo = new Schema({
  header: {
    type: String,
    required: true,
    minlength: 1,
  },
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  deadLine: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
  commentCount: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "comment",
    },
  ],
});

module.exports = mongoose.model("Todo", Todo);
