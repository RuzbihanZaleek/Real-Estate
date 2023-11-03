const express = require('express');
const { signup, signIn, google } = require('../controller/auth.controller.js');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signIn);
router.post('/google', google);

module.exports = router;