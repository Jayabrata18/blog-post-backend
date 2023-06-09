const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
const postModel = mongoose.model("Post", PostSchema);

module.exports = postModel;
