const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const {verifySignUp} = require('../middlewares');
const authController = require('../controllers/auth.controller');

router.post('/signup',
    [verifySignUp.checkDuplicateEmail],
    authController.signUp,
);

router.post('/signin', authController.signIn);

module.exports = router;
