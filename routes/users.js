const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.get('/', userController.getAllUsers);
// router.get('/:userId', userController.fetchUser);
router.post('/signUp', userController.createUser);
router.post('/signIn', userController.signInUser);


module.exports = router;
