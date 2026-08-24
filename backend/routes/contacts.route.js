const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const asyncHandler = require('../middlewares/asyncHandler');
const { getContacts, createContact, deleteContact } = require('../controllers/ContactController');

// Every route below requires a valid JWT — applied once here so it's
// never accidentally forgotten on an individual route.
router.use(auth);

router.get('/', asyncHandler(getContacts));
router.post('/', asyncHandler(createContact));
router.delete('/:id', asyncHandler(deleteContact));

module.exports = router;