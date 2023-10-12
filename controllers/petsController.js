const { getPetsModel, addPetModel, getPetByIdModel, updatePetModel, adoptOrFosterModel, savePetModel, returnPetModel, unSavePetModel, getPetsByUserIdModel } = require('../models/petsModel');

async function addPet(req, res) {
    try {
        req.body.petImage = req.file.path;
        const newPet = await addPetModel(req.body);
        res.send(newPet);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

async function getPet(req, res) {
    try {
        const { id } = req.params;
        const pet = await getPetByIdModel(id);
        res.send(pet);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

async function updatePet(req, res) {
    try {
        const updatedPet = {
            petId: req.body.petId,
            type: req.body.type,
            name: req.body.name,
            breed: req.body.breed,
            color: req.body.color,
            weight: req.body.weight,
            height: req.body.height,
            hypoallergenic: req.body.hypoallergenic,
            dietary: req.body.dietary,
            bio: req.body.bio
        }

        const updated = await updatePetModel(updatedPet);
        if (updated) {
            res.send({ ok: true });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

async function getPets(req, res) {
    try {
        const petsByQuery = await getPetsModel(req.query);
        res.send(petsByQuery);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

async function adoptOrFoster(req, res) {
    try {
        const id = req.params.id;
        const { userId, adoptOrFoster } = req.body;

        const newStatus = await adoptOrFosterModel(id, userId, adoptOrFoster);

        res.send({ newStatus: newStatus });
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

async function returnPet(req, res) {
    try {
        const id = req.params.id;

        const returned = await returnPetModel(id);

        res.send({ returned: returned });
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

async function savePet(req, res) {
    try {
        const petId = req.params.id;
        const userId = req.body.userId;

        const saved = await savePetModel(petId, userId);
        res.send({ savedId: saved });
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

async function unSavePet(req, res) {
    try {
        const petId = req.params.id;
        const userId = req.query.userId;


        const unsaved = await unSavePetModel(petId, userId);
        res.send({ unsaved });
    } catch (err) {
        console.log(err);
    }
}

async function getPetsByUserId(req, res) {
    try {
        const userId = req.params.id;
        const adoptedAndFosteredPets = await getPetsByUserIdModel(userId);

        res.send(adoptedAndFosteredPets);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { addPet, getPets, getPet, updatePet, adoptOrFoster, returnPet, savePet, unSavePet, getPetsByUserId };