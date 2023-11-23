const express = require('express');
const router = express.Router();
const { test, updateUser, deleteUser, getUserListings, getUser } = require('../controller/user.controller.js');
const { verifyUser } = require('../utils/verifyUser.js');

router.get('/test', test);
router.post('/update/:id', verifyUser, updateUser);
router.delete('/delete/:id', verifyUser, deleteUser);
router.get('/listings/:id', verifyUser, getUserListings);
router.get('/:id', verifyUser, getUser);

module.exports = router;
