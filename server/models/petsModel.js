const dbConnection = require('../knex/knex');

async function addPetModel(newPet) {
    const petToDb = {
        type: newPet.type,
        name: newPet.name,
        breed: newPet.breed,
        height: newPet.height,
        weight: newPet.weight,
        color: newPet.color,
        bio: newPet.bio,
        hypoallergenic: newPet.hypoallergenic,
        dietary: newPet.dietaryRestrictions,
        picture: newPet.petImage,
        adoptionStatus: 'available'
    }

    try {
        const [id] = await dbConnection('pets').insert(petToDb)
        newPet.id = id;
        return newPet;
    } catch (err) {
        console.log(err);
    }
}

async function getPetByIdModel(petId) {
    try {
        const pet = await dbConnection('pets').where({ petId: petId }).first();
        return pet;
    } catch (err) {
        console.log(err);
    }
}

async function updatePetModel(petId, updatedPet) {
    try {
        const updated = await dbConnection('pets').where({ petId: updatedUser.userId }).update(updatedPet);
        return updated;
    } catch (err) {
        console.log(err);
    }
}

async function getPetsModel(queryParams) {
    try {
        let query = dbConnection('pets');

        // Apply filters based on query parameters if they exist
        if (queryParams.type) {
            const typesForQuery = queryParams.type.replaceAll(",", "','");
            query = query.where(dbConnection.raw(`type IN ('${typesForQuery}')`));
        }
        if (queryParams.status) {
            const typesForQuery = queryParams.status.replaceAll(",", "','");
            query = query.where(dbConnection.raw(`adoptionStatus IN ('${typesForQuery}')`));
        }
        if (queryParams.minHeight || queryParams.maxHeight) {
            const minHeight = queryParams.minHeight || 0;
            const maxHeight = queryParams.maxHeight || 1000;
            query = query.whereBetween("height", [Number(minHeight), Number(maxHeight)]);
        }
        if (queryParams.minWeight || queryParams.maxWeight) {
            const minWeight = queryParams.minWeight || 0;
            const maxWeight = queryParams.maxWeight || 1000;
            query = query.whereBetween("weight", [Number(minWeight), Number(maxWeight)]);
        }
        if (queryParams.name) {
            query = query.where('name', 'like', `%${queryParams.name}%`);
        }
        query = query.orderBy("petId", "desc");

        const results = await query;
        return results;
    } catch (err) {
        console.log(err);
    }
}

async function adoptOrFosterModel(id, userId, adoptOrFoster) {
    try {
        let adoptionStatus;
        if (adoptOrFoster === 'adopt') {
            adoptionStatus = 'adopted';
        }
        if (adoptOrFoster === 'foster') {
            adoptionStatus = 'fostered';
        }

        const res = await dbConnection('pets').where({ petId: id }).update({
            adoptionStatus: adoptionStatus,
            ownerId: userId,
        });

        if (res) {
            return adoptionStatus;
        }
    } catch (err) {
        console.log(err);
    }
}

async function returnPetModel(petId) {
    try {
        const res = await dbConnection('pets').where({ petId: petId }).update({
            adoptionStatus: 'available',
            ownerId: null,
        });

        if (res) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
}

async function savePetModel(petId, userId) {
    try {
        const [id] = await dbConnection('pet_saving').insert({ petId: petId, userId: userId });
        return id;
    } catch (err) {
        console.log(err);
    }
}

async function unSavePetModel(petId, userId) {
    try {
        const unsaved = await dbConnection('pet_saving').where({ petId: petId }).where({ userId: userId }).del();

        return unsaved;
    } catch (err) {
        console.log(err);
    }
}

async function getPetsByUserIdModel(userId) {
    try {
        const adoptedAndFosteredPets = {
            adopted: [],
            fostered: [],
            saved: []
        };

        const adoptedFromDb = await dbConnection('pets').select('petId').where({ ownerId: userId, adoptionStatus: 'adopted' });

        adoptedAndFosteredPets.adopted = adoptedFromDb.map(row => row.petId);

        const fosteredFromDb = await dbConnection('pets').select('petId').where({ ownerId: userId, adoptionStatus: 'fostered' });

        adoptedAndFosteredPets.fostered = fosteredFromDb.map(row => row.petId);

        const savedPetsFromDb = await dbConnection('pet_saving').select('petId').where({ userId: userId });

        if (savedPetsFromDb) {
            adoptedAndFosteredPets.saved = savedPetsFromDb.map(row => row.petId);
        }

        return adoptedAndFosteredPets;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getPetsModel, addPetModel, getPetByIdModel, updatePetModel, adoptOrFosterModel, returnPetModel, savePetModel, unSavePetModel, getPetsByUserIdModel };
