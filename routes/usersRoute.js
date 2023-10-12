const express = require('express');
const router = express.Router();

const { auth, hashPassword, isAdmin } = require('../middleware/authMiddleware');
const UsersController = require('../controllers/usersController');
const { validateBody } = require('../middleware/validationMiddleware');
const { updateDetailsSchema, changePasswordSchema } = require('../schemas');

router.get('/:id', auth, UsersController.getUserById);

router.put('/', auth, validateBody(updateDetailsSchema), UsersController.updateUserDetails);

router.put('/password', auth, validateBody(changePasswordSchema), hashPassword, UsersController.changePassword);

router.get('/', auth, isAdmin, UsersController.getAllUsers);

module.exports = router;