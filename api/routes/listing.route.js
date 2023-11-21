const express = require('express');
const { createListing, deleteListing, updateListing, getListing } = require('../controller/listing.controller');
const { verifyUser } = require('../utils/verifyUser');
const router = express.Router();

router.post('/create', verifyUser, createListing);
router.delete('/delete/:id', verifyUser, deleteListing);
router.post('/update/:id', verifyUser, updateListing);
router.get('/get/:id', getListing);

module.exports = router;
