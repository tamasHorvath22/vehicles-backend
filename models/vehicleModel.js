let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let vehicleSchema = new Schema({
    make: { type : String },
    type: { type : String },
    distance: { type : Number },
    workHours: { type : Number },
    savedAt: { type : Number },
    modifiedAt: { type : Number }
});

let Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
