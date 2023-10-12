const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { getUserByIdModel } = require('../models/usersModel');

function passwordMatch(req, res, next) {
    if (req.body.password !== req.body.rePassword) {
        return res.status(400).send('Passwords do not match');
    }
    next();
}

function hashPassword(req, res, next) {
    const saltRounds = 6;
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            res.status(400).send('Error hashing password');
        } else {
            req.body.password = hash;
            next();
        }
    });
}

function auth(req, res, next) {

    if (!req.headers.authorization) {
        res.status(401).send('Authorization headers required');
    }

    const token = req.headers.authorization.replace('Bearer ', '');

    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
        if (err) {
            return res.status(401).send('Unauthorized');
        }
        req.body.id = decoded.id;
        next();
    });
}

async function isAdmin(req, res, next) {
    try {
        const user = await getUserByIdModel(req.body.id);
        if (user['is_admin'] != 1) {
            return res.status(401).send('Unauthorized');
        }
        next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = { passwordMatch, hashPassword, auth, isAdmin };