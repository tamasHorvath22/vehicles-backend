module.exports = function(app) {

    let Vehicle = require('../models/vehicleModel');
    let VehicleAlert = require('../models/vehicleAlertModel');
    let bodyParser = require('body-parser');
    let errorCodes = require('../common/constants/api-error-codes');
    let jsonParser = bodyParser.json();

    app.post('/vehicle-alert', jsonParser, function (req, res) {

        Vehicle.findById(req.body.id, function(err, vehicle) {
            if (err) {
                res.send(errorCodes.NO_VEHICLE_FOUND);
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
                    res.send(errorCodes.COULD_NOT_SAVE_ELEMENT);
                    throw err;
                }
                res.json(JSON.stringify(vehicle));
            })
        });
    });

    app.put('/vehicle-alert', jsonParser, function (req, res) {
        let hasChanged = false;
        
        VehicleAlert.model.findById(req.body.alertId, function (err, alert) {
            if (err) {
                res.send(errorCodes.NO_ALERT_FOUND);
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
                alert.modifiedAt = new Date().getTime();
                alert.save();
                res.json(JSON.stringify(alert));
            } else {
                res.send(errorCodes.NO_CHANGES_MADE);
            }
        });
    });

    app.get('/vehicle-alert', jsonParser, function(req, res) {
        let id = req.params.id;
        VehicleAlert.model.find(req.body, function(err, alerts) {
            if (err) {
                res.send(errorCodes.NO_ALERT_FOUND);
                throw err;
            }
            res.json(JSON.stringify(alerts));
        });
    });
}
