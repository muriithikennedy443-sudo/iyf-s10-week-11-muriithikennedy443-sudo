const User = require('../models/User');
const Post = require('../models/Post');

// Get current user
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    next(error);
  }
};

// Update profile
const updateMe = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { username, email },
      { new: true, runValidators: true }
    );

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    next(error);
  }
};

// Get user's posts
const getUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ author: req.params.id })
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports = { getMe, updateMe, getUserPosts };