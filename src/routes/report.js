const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const ctrl = require('../controller/reportController');

router.use(auth);
router.get('/inventory', ctrl.inventory);
router.get('/transactions', ctrl.transactions);

module.exports = router;

