const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/asyncHandler');
const { signup, login } = require('../controllers/AuthController');

router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));

module.exports = router;