const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const asyncHandler = require('../middlewares/asyncHandler');
const {
  createLinkCode,
  redeemLinkCode,
  getConnections,
  removeConnection
} = require('../controllers/linkController');

router.use(auth);

router.post('/code', asyncHandler(createLinkCode));
router.post('/redeem', asyncHandler(redeemLinkCode));
router.get('/', asyncHandler(getConnections));
router.delete('/:id', asyncHandler(removeConnection));

module.exports = router;