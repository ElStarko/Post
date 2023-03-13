import express from 'express';
import Post from '../models/Post';

const router = express.Router();

// GET all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find({ deleted: { $ne: true } }).sort({ createdAt: 'desc' }).populate('author');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific post by ID
router.get('/posts/:id', getPost, (req, res) => {
  res.json(res.post);
});

// CREATE a new post
router.post('/posts', async (req, res) => {
  const post = new Post({
    content: req.body.content,
    media: req.body.media,
    author: req.body.author,
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a post
router.put('/posts/:id', getPost, async (req, res) => {
  if (req.body.content != null) {
    res.post.content = req.body.content;
  }
  if (req.body.media != null) {
    res.post.media = req.body.media;
  }
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// SOFT DELETE a post
router.delete('/posts/:id', getPost, async (req, res) => {
  res.post.deleted = true;
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get post by ID and attach it to the request object
async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id).populate('author');
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  if (post.deleted) {
    return res.status(404).json({ message: 'Cannot find post' });
  }

  res.post = post;
  next();
}

export default router;
