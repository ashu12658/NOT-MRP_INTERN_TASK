const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const ctrl = require('../controller/contactController');

router.use(auth);
router.get('/', ctrl.list);
router.post('/create', ctrl.create);
router.put('/update/:id', ctrl.update);
router.delete('/remove/:id', ctrl.remove);

module.exports = router;
