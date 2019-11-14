module.exports = function(app) {

    let Vehicle = require('../models/vehicleModel');
    let VehicleAlert = require('../models/vehicleAlertModel');
    let bodyParser = require('body-parser');
    let jsonParser = bodyParser.json();
    const errorCodes = require('../common/constants/api-error-codes');

    app.post('/api/vehicle-alert', jsonParser, function (req, res) {

        Vehicle.findById(req.body.id, function(err, vehicle) {
            if (err) {
                res.send(errorCodes.VEHICLE.NO_VEHICLE_FOUND);
                throw err;
            }
            let vehicleAlert = VehicleAlert.model({
                action: req.body.data.action,
                alertDistance: req.body.data.alertDistance || null,
                alertDate: req.body.data.alertDate || null,
                alertWorkHours: req.body.data.alertWorkHours || null,
                savedAt: new Date().getTime(),
                modifiedAt: 0,
                alertSent: false
            });

            vehicle.alerts.push(vehicleAlert);
            vehicle.save(function(err) {
                if (err) {
                    res.send(errorCodes.VEHICLE.VEHICLE.COULD_NOT_SAVE_VEHICLE);
                    throw err;
                }
                res.json(JSON.stringify(vehicle));
            })
        });
    });

    app.put('/api/vehicle-alert', jsonParser, function (req, res) {
        let hasChanged = false;
        
        VehicleAlert.model.findById(req.body.alertId, function (err, alert) {
            if (err) {
                res.send(errorCodes.VEHICLE_ALERT.NO_ALERT_FOUND);
                throw err;
            }
            Object.keys(req.body.data).forEach(key => {
                if (alert[key]) {
                    alert[key] = req.body.data[key];
                    hasChanged = true;
                }
            })
            if (hasChanged) {
                alert.__v++;
                alert.save();
                res.json(JSON.stringify(alert));
            } else {
                res.send(errorCodes.COMMON.NO_CHANGES_MADE);
            }
        });
    });

    app.get('/api/vehicle-alert', jsonParser, function(req, res) {
        let id = req.params.id;
        VehicleAlert.model.find(req.body, function(err, alerts) {
            if (err) {
                res.send(errorCodes.VEHICLE_ALERT.NO_ALERT_FOUND);
                throw err;
            }
            res.json(JSON.stringify(alerts));
        });
    });

    app.delete('/api/vehicle-alert', jsonParser, function(req, res) {
        VehicleAlert.model.deleteOne(req.body, function(err) {
            if (err) {
                res.send(errorCodes.VEHICLE_ALERT.COULD_NOT_DELETE_VEHILE_ALERT);
                throw err;
            }
            res.send(errorCodes.VEHICLE_ALERT.VEHICLE_ALERT_DELETED);
        });
    });
}
