module.exports = function(app) {
    
    let Vehicle = require('../models/vehicleModel');
    let bodyParser = require('body-parser');
    let jsonParser = bodyParser.json();

    app.post('/vehicle', jsonParser, function (req, res) {
        console.log(req);
        let vehicle = Vehicle({
            make: req.body.make,
            type: req.body.type,
            distance: req.body.distance,
            workHours: req.body.workHours
        });
        console.log(vehicle);

        vehicle.save(function(err) {
            if (err) throw err;
            console.log(' vehicle saved! ');
            res.send('vehicle saved to database!!');
        });
    });

    app.get('/vehicle', function(req, res) {
        res.send(' get well! ');
    });
}