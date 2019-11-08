module.exports = function(app) {
    
    let Vehicle = require('../models/vehicleModel');
    let bodyParser = require('body-parser');
    let jsonParser = bodyParser.json();

    app.post('/vehicle', jsonParser, function (req, res) {
        let timestamp = new Date().getTime();
        let vehicle = Vehicle({
            make: req.body.make || null,
            type: req.body.type || null,
            distance: req.body.distance || 0,
            workHours: req.body.workHours || null,
            savedAt: timestamp,
            modifiedAt: 0
        });

        vehicle.save(function(err) {
            if (err) throw err;
            res.json(JSON.stringify(vehicle));
        });
    });

    app.put('/vehicle', jsonParser, function (req, res) {
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
                doc.modifiedAt = new Date().getTime();
                doc.save();
                res.json(JSON.stringify(doc));
            } else {
                res.send('no changes!');
            }
          });
    });

    app.get('/vehicle/:id', function(req, res) {
        let id = req.params.id;
        Vehicle.findById(id, function(err, vehicle) {
            if (err) {
                res.send('there were some error!');
                throw err;
            }
            res.json(JSON.stringify(vehicle));
        });
    });
}