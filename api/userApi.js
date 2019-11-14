module.exports = function(app) {

    const bodyParser = require('body-parser');
    const User = require('../models/userModel');
    const jsonParser = bodyParser.json();
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const config = require('../config/index');
    const errorCodes = require('../common/constants/api-error-codes');

    app.post('/login', jsonParser, (req, res) => {
        User.findOne({ username: req.body.username }, function(err, user) {
            if (err) throw err;
            bcrypt.compare(req.body.password, user.password, function(error, authenticated) {
                if (error) throw error;
                if (authenticated) {
                    jwt.sign({ username: user.username }, config.getJwtPrivateKey(), function(tokenError, token) {
                        if (tokenError) {
                            res.send(errorCodes.USER.TOKEN_CREATE_ERROR);
                            throw tokenError
                        };
                        res.json({ token: token });
                    });
                } else {
                    res.send(errorCodes.USER.WRONG_USERNAME_OR_PASSWORD);
                }
            })
        });
    });

    app.post('/register', jsonParser, function (req, res) {
        let user = User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        user.save(function(err) {
            if (err) {
                if (err.code === 11000) {
                    res.send(errorCodes.USER.USERNAME_TAKEN);
                } else {
                    res.send(errorCodes.USER.UNSUCCESSFUL_REGISTRATION);
                }
                console.log(err);
                throw err;
            };
            res.send(errorCodes.USER.SUCCESSFUL_REGISTRATION);
        });
    });

    app.post('/api/change-pass', jsonParser, function (req, res) {
        User.findOne({ username: req.decoded.username }, function(err, user) {
            if (err) {
                res.send(errorCodes.USER.WRONG_USERNAME_OR_PASSWORD);
                throw err;
            };
            bcrypt.compare(req.body.oldPassword, user.password, function(error, authenticated) {
                if (error) {
                    res.send(errorCodes.USER.AUTHENTICATION_ERROR);
                    throw error;
                };
                if (authenticated) {
                    user.password = req.body.newPassword;
                    user.save();
                    res.send(errorCodes.USER.PASSWORD_CHANGE_SUCCESS);
                } else {
                    res.send(errorCodes.USER.WRONG_USERNAME_OR_PASSWORD);
                }
            })
        });
    });
}
