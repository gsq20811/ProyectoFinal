const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const validator = require('validator')

function passwordEmpty(req, res, next) {
    password = req.body.password

    if (!password || validator.isEmpty(password, { ignore_whitespace: true })) {
        return res.status(400).json({
            message: 'Falta llenar un campo'
        })
    };
    return next();
};

module.exports = {
    passwordEmpty
}