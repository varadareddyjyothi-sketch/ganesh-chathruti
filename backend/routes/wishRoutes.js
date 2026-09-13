const express = require('express');
const router = express.Router();
const wishController = require('../controllers/wishController');

router.post('/wishes', wishController.submitWish);
router.get('/wishes', wishController.getWishes);

module.exports = router;
