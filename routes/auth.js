// routes/auth.js
const express = require('express');
const { register, login ,test} = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/test', test);



module.exports = router;