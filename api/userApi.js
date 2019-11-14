module.exports = function(app) {

    const bodyParser = require('body-parser');
    const User = require('../models/userModel');
    const jsonParser = bodyParser.json();
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const config = require('../config/index');


    app.post('/login', jsonParser, (req, res) => {
        User.findOne({ username: req.body.username }, function(err, user) {
            if (err) throw err;
            bcrypt.compare(req.body.password, user.password, function(error, authenticated) {
                if (error) throw error;
                if (authenticated) {
                    jwt.sign({ username: user.username }, config.getJwtPrivateKey(), function(tokenError, token) {
                        if (tokenError) throw tokenError;
                        res.send(token ? token : 'not good!!');
                    });
                } else {
                    res.send('not authenticated!!');
                }
            })
        });
    });

    app.post('/register', jsonParser, function (req, res) {
        let user = User({
            username: req.body.username,
            password: req.body.password
        });
        user.save(function(err) {
            if (err) throw err;
            console.log(' user saved! ');
            res.send('registered!!');
        });
    });

    app.post('/change-pass', jsonParser, function (req, res) {

    });
}