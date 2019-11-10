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

            // vehicleAlert.save(function(err) {
            //     if (err) throw err;
            //     res.json(JSON.stringify(vehicleAlert));
            // });

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

    // app.put('/vehicle', jsonParser, function (req, res) {
    //     let hasChanged = false;
    //     Vehicle.findById(req.body.id, function (err, doc){
    //         if (err) throw err;
    //         Object.keys(req.body.data).forEach(key => {
    //             if (doc[key]) {
    //                 doc[key] = req.body.data[key];
    //                 hasChanged = true;
    //             }
    //         })
    //         if (hasChanged) {
    //             doc.__v++;
    //             doc.modifiedAt = new Date().getTime();
    //             doc.save();
    //             res.json(JSON.stringify(doc));
    //         } else {
    //             res.send('no changes!');
    //         }
    //       });
    // });

    // app.get('/vehicle/:id', function(req, res) {
    //     let id = req.params.id;
    //     Vehicle.findById(id, function(err, vehicle) {
    //         if (err) {
    //             res.send(errorCodes.NO_ITEM_FOUND);
    //             throw err;
    //         }
    //         res.json(JSON.stringify(vehicle));
    //     });
    // });
}