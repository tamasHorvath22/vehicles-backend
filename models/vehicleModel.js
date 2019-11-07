let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let vehicleSchema = new Schema({
    make: { type : String },
    type: { type : String },
    licence: { type : String },
    drivenDistance: { type : Number },
    workHours: { type : Number },
    savedAt: { type : Number },
    modifiedAt: { type : Number },
    updates: { type: Array },
    alerts: { type: Array }
});

let Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
