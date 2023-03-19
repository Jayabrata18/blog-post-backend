const router = require("express").Router();
const Post = require("../models/postModel");
const auth = require("../middleware/authorization");

//create post
router.post("/create", auth, async (req, res) => {
  console.log(req.body);
  try {
    const savePost = new Post(req.body);
    const savedPost = await savePost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//update post
router.put("/update/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.updateOne({ $set: req.body });
      res.status(200).json("it has been updated");
    } else {
      res.status(403).json("you can only update your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//delete post
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.delete();
      res.status(200).json("the post is deleted");
    } else {
      res.status(403).json("you can only delete your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//get All posts
router.get("/fetch", auth, async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});
//get one post
router.get("/fetchOne/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
