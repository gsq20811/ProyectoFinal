const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY;
const expiresIn = { expiresIn: '7d' };

const User = require('../models/user');

const { responseToMongooseError } = require('../helpers/responses')

function signin(req, res) {
    let body = req.body;
    User.findOne({ email: body.email })
        .exec()
        .then(data => {
            if (data === null) {
                return res.status(401).json({
                    message: 'No se ha encontrado el usuario'
                });
            }
            if (!bcrypt.compareSync(body.password, data.password)) {
                return res.status(401).json({
                    message: 'Contraseña errónea'
                });
            }
            let payload = {
                _id: data._id,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName
            }
            const token = jwt.sign(payload, JWT_KEY, expiresIn);
            const response = {
                token: token,
                user: {
                    firstName: data.firstName,
                    lastName: data.lastName
                },
            }
            return res.status(200).json(response);
        })
        .catch(err => {
            responseToMongooseError(res, err);
        });
}

function signup(req, res) {
    let body = req.body;
    User.findOne({ email: body.email })
        .exec()
        .then(data => {
            if (data) {
                return res.status(409).json({
                    message: 'Existe un usuario con ese correo, porfavor intente de nuevo'
                })
            }
            const user = new User({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phoneNumber: body.phoneNumber,
                password: bcrypt.hashSync(body.password, 10)
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'Jugador registrado con éxito'
                    });
                })
                .catch(err => {
                    responseToMongooseError(res, err);
                });

        })
        .catch(err => {
            responseToMongooseError(res, err);
        });
}

module.exports = {
    signin,
    signup
}