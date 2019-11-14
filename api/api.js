const jwt = require('jsonwebtoken');

const userApi = require('./userApi');
const vehicleApi = require('./vehicleApi');
const vehicleAlertApi = require('./vehicleAlertApi');
const alertSettingsApi = require('./alertSettingsApi');

const errorCodes = require('../common/constants/api-error-codes');
const config = require('../config');

module.exports = function(app, ProtectedRoutes) {
    app.use('/api', ProtectedRoutes);

    ProtectedRoutes.use((req, res, next) => {
        let token = req.headers['authorization'];
        if (token) {
            if (token.startsWith('Bearer ')) {
                token = token.slice(7);
            }
            jwt.verify(token, config.getJwtPrivateKey(), (err, decoded) => {
                if (err) {
                    res.send(errorCodes.USER.TOKEN_ERROR);
                    throw err;
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
        res.send(errorCodes.USER.MISSING_TOKEN);
        }
    });

    userApi(app);
    vehicleApi(app);
    vehicleAlertApi(app);
    alertSettingsApi(app);
}
