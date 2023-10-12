const dbConnection = require('../knex/knex');

async function getUserByEmailModel(email) {
    try {
        const user = await dbConnection('users').where({ email: email }).first();
        return user;
    } catch (err) {
        console.log(err);
    }
}

async function getUserByIdModel(id) {
    try {
        const user = await dbConnection('users').where({ userId: id }).first();
        return user;
    } catch (err) {
        console.log(err);
    }
}

async function registerUserModel(newUser) {
    try {
        const [id] = await dbConnection('users').insert(newUser);
        return id;
    } catch (err) {
        console.log(err);
    }
}

async function updateUserModel(updatedUser) {
    try {
        const updated = await dbConnection('users').where({ userId: updatedUser.userId }).update(updatedUser);
        return updated;
    } catch (err) {
        console.log(err);
    }
}

async function changePasswordModel(password, userId) {
    try {
        const updated = await dbConnection('users').where({ userId: userId }).update({ password: password });
        return updated;
    } catch (err) {
        console.log(err);
    }
}

async function getAllUsersModel() {
    try {
        const allUsers = await dbConnection.from('users');
        return allUsers;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getUserByEmailModel, registerUserModel, getUserByIdModel, updateUserModel, getAllUsersModel, changePasswordModel };