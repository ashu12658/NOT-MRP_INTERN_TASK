const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const ctrl = require('../controller/transactionController');

router.use(auth);
router.get('/', ctrl.list);
router.post('/create', ctrl.create);

module.exports = router;
