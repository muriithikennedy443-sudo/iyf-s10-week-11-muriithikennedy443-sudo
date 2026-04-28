const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { protect } = require('../middleware/auth');

router.get('/me', protect, usersController.getMe);
router.put('/me', protect, usersController.updateMe);
router.get('/:id/posts', usersController.getUserPosts);

module.exports = router;