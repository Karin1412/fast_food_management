const express = require('express');
const router = express.Router();
const authController = require('../controller/auth/authController');
const logoutController = require('../controller/auth/logoutController');
const refreshTokenController = require('../controller/auth/refreshTokenController');
const registerController = require('../controller/auth/registerController');

router.post('/login', authController.handleLogin);
router.get('/logout', logoutController.handleLogout);
router.get('/refresh', refreshTokenController.handleRefreshToken);
router.post('/register', registerController.handleNewUser);

module.exports = router;