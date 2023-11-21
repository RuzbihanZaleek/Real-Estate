const express = require('express');
const { createListing, deleteListing } = require('../controller/listing.controller');
const { verifyUser } = require('../utils/verifyUser');
const router = express.Router();

router.post('/create', verifyUser, createListing);
router.delete('/delete/:id', verifyUser, deleteListing);
module.exports = router;
