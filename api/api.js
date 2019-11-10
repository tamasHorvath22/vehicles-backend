let userApi = require('./userApi');
let vehicleApi = require('./vehicleApi');
let vehicleAlertApi = require('./vehicleAlertApi');

module.exports = function(app) {
    userApi(app);
    vehicleApi(app);
    vehicleAlertApi(app);
}