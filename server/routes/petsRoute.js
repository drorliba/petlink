const express = require('express');
const router = express.Router();

const PetsController = require('../controllers/petsController');
const { upload } = require('../middleware/imagesMiddleware');
const { auth, isAdmin } = require('../middleware/authMiddleware');
const { petAvailable } = require('../middleware/petsMiddleware');
const { checkUserId } = require('../middleware/usersMiddleware');

router.post('/', auth, isAdmin, upload.single('petImage'), PetsController.addPet);

router.get('/:id', PetsController.getPet);

router.put('/', auth, PetsController.updatePet);

router.get('/', PetsController.getPets);

router.post('/:id/adopt', auth, checkUserId, PetsController.adoptOrFoster);

router.delete('/:id/return', auth, PetsController.returnPet);

router.post('/:id/save', auth, PetsController.savePet);

router.delete('/:id/save', auth, PetsController.unSavePet);

router.get('/user/:id', auth, PetsController.getPetsByUserId);

module.exports = router;