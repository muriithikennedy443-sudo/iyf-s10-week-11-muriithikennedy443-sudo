const Post = require('../models/Post');

// Get all posts with author info
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// Get single post
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid post ID' });
    }
    next(error);
  }
};

// Create post (now linked to user)
const createPost = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;

    const post = new Post({
      title,
      content,
      author: req.user._id, // From auth middleware
      tags
    });

    await post.save();

    // Populate author info
    await post.populate('author', 'username email');

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

// Only author can edit
const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: 'You can only edit your own posts'
      });
    }

    // Update
    const { title, content, tags } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;

    await post.save();

    res.json(post);
  } catch (error) {
    next(error);
  }
};

// Delete post
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: 'You can only delete your own posts'
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Like post
const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.like();

    res.json(post);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost
};