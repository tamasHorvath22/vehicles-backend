module.exports = function(app) {
    
    const Vehicle = require('../models/vehicleModel');
    const bodyParser = require('body-parser');
    const jsonParser = bodyParser.json();
    const errorCodes = require('../common/constants/api-error-codes');

    app.post('/api/vehicle', jsonParser, function (req, res) {
        let timestamp = new Date().getTime();
        let vehicle = Vehicle({
            make: req.body.make || null,
            type: req.body.type || null,
            vehicleType: req.body.vehicleType,
            licence: req.body.licence || null,
            drivenDistance: req.body.drivenDistance || 0,
            workHours: req.body.workHours || null,
            savedAt: timestamp,
            modifiedAt: 0
        });

        vehicle.save(function(err) {
            if (err) throw err;
            res.json(JSON.stringify(vehicle));
        });
    });

    app.put('/api/vehicle', jsonParser, function (req, res) {
        let hasChanged = false;
        Vehicle.findById(req.body.id, function (err, doc){
            if (err) throw err;
            Object.keys(req.body.data).forEach(key => {
                if (doc[key]) {
                    doc[key] = req.body.data[key];
                    hasChanged = true;
                }
            })
            if (hasChanged) {
                doc.__v++;
                doc.save();
                res.json(JSON.stringify(doc));
            } else {
                res.send(errorCodes.COMMON.NO_CHANGES_MADE);
            }
          });
    });

    app.get('/api/vehicle', jsonParser, function(req, res) {
        Vehicle.find(req.body, function(err, vehicles) {
            if (err) {
                res.send(errorCodes.VEHICLE.NO_VEHICLE_FOUND);
                throw err;
            }
            res.json(JSON.stringify(vehicles));
        });
    });

    app.delete('/api/vehicle', jsonParser, function(req, res) {
        Vehicle.deleteOne(req.body, function(err, vehicles) {
            if (err) {
                res.send(errorCodes.VEHICLE.COULD_NOT_DELETE_VEHILE);
                throw err;
            }
            res.send(errorCodes.VEHICLE.VEHICLE_DELETED);
        });
    });
}