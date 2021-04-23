const { Router } = require('express');
const router = Router();

const AuthenticationController = require('../controllers/authentication');

const AuthenticationMiddleware = require('../middlewares/authentication');

router.post('/signin', AuthenticationController.signin);
router.post('/signup', AuthenticationMiddleware.passwordEmpty,
                       AuthenticationController.signup);

module.exports = router;