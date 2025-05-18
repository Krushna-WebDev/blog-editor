const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile', authenticateToken, authController.profile);

module.exports = router;