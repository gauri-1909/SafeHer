const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const asyncHandler = require('../middlewares/asyncHandler');
const {
  triggerSOS,
  getSOSHistory,
  resolveSOS,
  getLinkedUserSOSHistory
} = require('../controllers/SosController');

router.use(auth);

router.post('/', asyncHandler(triggerSOS));
router.get('/', asyncHandler(getSOSHistory));
router.patch('/:id/resolve', asyncHandler(resolveSOS));
router.get('/linked/:userId', asyncHandler(getLinkedUserSOSHistory));

module.exports = router;