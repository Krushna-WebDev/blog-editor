const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');

router.post('/save-draft', blogController.saveDraft);
router.post('/publish', blogController.publishBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

module.exports = router;
