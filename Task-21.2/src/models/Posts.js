const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
    trim: true,
    minlength: 3,
    maxlength: 200, 
  },
  content: {
    type: String,
    required: true,
    minlength: 10, 
  },
  author: {
    type: String,
    required: true, 
  },
  likes: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add index for searching
postSchema.index({ title: 'text', content: 'text' });

// Instance method
postSchema.methods.like = function() {
  this.likes++;
  return this.save();
};

// Static method
postSchema.statics.findByAuthor = function(author) {
  return this.find({ author: new RegExp(author, 'i') });
};

module.exports = mongoose.model('Post', postSchema);