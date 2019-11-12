let userApi = require('./userApi');
let vehicleApi = require('./vehicleApi');
let vehicleAlertApi = require('./vehicleAlertApi');
let alertSettingsApi = require('./alertSettingsApi');

module.exports = function(app) {
    userApi(app);
    vehicleApi(app);
    vehicleAlertApi(app);
    alertSettingsApi(app);
}