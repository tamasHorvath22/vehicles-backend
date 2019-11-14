module.exports = function(app) {

    const errorCodes = require('../common/constants/api-error-codes');

    // let bodyParser = require('body-parser');
    // let User = require('../models/userModel');
    // let jsonParser = bodyParser.json();

    // const bcrypt = require('bcrypt');
    // const saltRounds = 10;

    // app.post('/login', jsonParser, (req, res) => {
    //     User.findOne({ username: req.body.username }, function(err, user) {
    //         console.log('this is the user: ' + user);
    //         if (err) throw err;
    //         bcrypt.compare(req.body.password, user.password, function(error, result) {
    //             if (error) throw err;
    //             res.send(result? 'success!!' : 'not good!!');
    //         })
    //     });
    // });
}