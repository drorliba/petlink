const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getUserByEmailModel, getUserByIdModel } = require('../models/usersModel');

async function isNewUser(req, res, next) {
    const user = await getUserByEmailModel(req.body.email);
    if (user) {
        return res.status(400).send('User with this email address already exists');
    }
    next();
}

async function doesUserExist(req, res, next) {
    const user = await getUserByEmailModel(req.body.email);
    if (user) {
        req.body.user = user;
        next();
    } else {
        res.status(400).send("User with this email doesn't exist");
    }
}

async function checkUserId(req, res, next) {
    const user = await getUserByIdModel(req.body.userId);
    if (user) {
        req.body.user = user;
        next();
    } else {
        res.status(400).send('There is no user with this ID');
    }
}

async function validatePass(req, res, next) {
    const { password, user } = req.body;
    try {
        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) {
                return res.status(401).send('Wrong password');
            }

            if (err) {
                res.status(500).send('Error comparing')
            }

            if (result) {
                next();
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

module.exports = { isNewUser, doesUserExist, checkUserId, validatePass };