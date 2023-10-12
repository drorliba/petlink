require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerUserModel, getUserByIdModel } = require('../models/usersModel');

async function registerNewUser(req, res) {
    try {
        const newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            password: req.body.password,
        }

        const id = await registerUserModel(newUser);
        if (id) {
            res.send({ ok: true, id: id });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

async function loginUser(req, res) {
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
                const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '60d' });
                res.send({ token: token });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

async function getLoggedInUser(req, res) {
    try {
        const id = req.body.id;
        const user = await getUserByIdModel(id);
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

module.exports = { registerNewUser, loginUser, getLoggedInUser };