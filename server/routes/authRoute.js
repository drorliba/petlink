const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

const { passwordMatch, hashPassword, auth } = require('../middleware/authMiddleWare');
const { isNewUser, doesUserExist } = require('../middleware/usersMiddleware');
const { validateBody } = require('../middleware/validationMiddleware');
const { signupSchema, loginSchema } = require('../schemas');

router.post('/signup', validateBody(signupSchema), passwordMatch, isNewUser, hashPassword, AuthController.registerNewUser);

router.post('/login', validateBody(loginSchema), doesUserExist, AuthController.loginUser);

router.get('/loggedInUser', auth, AuthController.getLoggedInUser);

module.exports = router;