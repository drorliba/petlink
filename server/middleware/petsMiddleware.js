require('dotenv').config();
const { getPetByIdModel } = require('../models/petsModel');

async function petAvailable(req, res, next) {
    const pet = await getPetByIdModel(req.params.id);
    const { adoptOrFoster } = req.body;

    if (pet.adoptionStatus != 'available') {
        return res.status(400).send('This pet is not available');
    }
    next();
}

module.exports = { petAvailable };