const express = require('express');
const router = express.Router();
const { test } = require('../controller/user.controller');

router.get('/', test);

module.exports = router;