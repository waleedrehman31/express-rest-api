const express = require("express");

const router = express.Router();

const Post = require("../models/Posts");

router.get("/", async (req, res) => {
  try {
    const getAllPosts = await Post.find();
    res.json(getAllPosts);
  } catch (error) {
    res.json({ message: errors });
    console.log(errors);
  }
});

router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    const savePost = await post.save();
    res.json(savePost);
  } catch (error) {
    res.json({ message: errors });
    console.log(errors);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getOnePost = await Post.findById(req.params.id);
    res.status(200).send("Action Succeeded").json(getOnePost);
  } catch (error) {
    res.json({ message: errors });
    res.status(404).send(`Action Denied Not Found: error ${error}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletePost = await Post.deleteOne({ _id: req.params.id });
    res.status(200).send("Action Succeeded").json(deletePost);
  } catch (error) {
    res.status(500).send(`Action Denied: error ${error}`);
  }
});

module.exports = router;
