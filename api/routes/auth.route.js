const express = require('express');
const { signup, signIn } = require('../controller/auth.controller.js');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signIn);

module.exports = router;