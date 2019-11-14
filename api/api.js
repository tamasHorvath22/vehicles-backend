const userApi = require('./userApi');
const vehicleApi = require('./vehicleApi');
const vehicleAlertApi = require('./vehicleAlertApi');
const alertSettingsApi = require('./alertSettingsApi');

const config = require('../config');
const jwt = require('jsonwebtoken');

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
                    res.send(errorCodes.TOKEN_ERROR);
                    throw err;
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
        res.send(errorCodes.MISSING_TOKEN);
        }
    });

    userApi(app);
    vehicleApi(app);
    vehicleAlertApi(app);
    alertSettingsApi(app);
}
