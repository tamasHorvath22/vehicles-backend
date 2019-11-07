module.exports = function(app) {
    
    let Vehicle = require('../models/vehicleModel');
    let bodyParser = require('body-parser');
    let jsonParser = bodyParser.json();

    app.post('/vehicle', jsonParser, function (req, res) {
        let timestamp = new Date().getTime();
        let vehicle = Vehicle({
            make: req.body.make,
            type: req.body.type,
            distance: req.body.distance,
            workHours: req.body.workHours,
            savedAt: timestamp,
            modifiedAt: timestamp
        });

        vehicle.save(function(err) {
            if (err) throw err;
            res.json(JSON.stringify(vehicle));
        });
    });

    app.get('/vehicle/:id', function(req, res) {
        let id = req.params.id;
        Vehicle.findById(id, function(err, vehicle) {
            if (err) throw err;
            res.json(JSON.stringify(vehicle));
        });
    });
}