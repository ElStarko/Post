const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// GET all comments for a post
router.get('/:id', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).populate('author');
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new comment for a post
router.post('/', async (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    author: req.body.author,
    post: req.body.post,
  });
  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a comment
router.put('/comments/:id', getComment, async (req, res) => {
  if (req.body.content != null) {
    res.comment.content = req.body.content;
  }
  try {
    const updatedComment = await res.comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a comment
router.delete('/:id', getComment, async (req, res) => {
  console.log("got here", req.params)

  res.comment.deleted = true;
  try {
    const updatedComment = await res.comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get comment by ID and attach it to the request object
async function getComment(req, res, next) {
  let comment;
  try {
    comment = await Comment.findById(req.params.id).populate('author');
    if (comment == null) {
      return res.status(404).json({ message: 'Cannot find comment' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.comment = comment;
  next();
}

module.exports = router;
