require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByIdModel, updateUserModel, getAllUsersModel, getAdminsModel, changePasswordModel } = require('../models/usersModel');

async function getAllUsers(req, res) {
    try {
        const allUsers = await getAllUsersModel();
        res.send(allUsers);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

async function getAdmins(req, res) {
    try {
        const adminsList = await getAdminsModel();
        res.send(adminsList);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const user = await getUserByIdModel(id);
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

async function updateUserDetails(req, res) {
    try {
        const updatedUser = {
            userId: req.body.userId,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            bio: req.body.bio
        }

        const updated = await updateUserModel(updatedUser);
        if (updated) {
            res.send({ ok: true });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

async function changePassword(req, res) {
    try {
        const { password, userId } = req.body;

        const updated = await changePasswordModel(password, userId);
        if (updated) {
            res.send({ ok: true });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

module.exports = { getAllUsers, updateUserDetails, getAdmins, getUserById, changePassword };