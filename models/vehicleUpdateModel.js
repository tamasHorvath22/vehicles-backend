let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let vehicleUpdateSchema = new Schema({
    action: { type : String },
    distance: { type : Number },
    workHours: { type : Number },
    savedAt: { type : Number },
    modifiedAt: { type : Number }
});

let VehicleUpdate = mongoose.model('VehicleUpdate', vehicleUpdateSchema);

module.exports = VehicleUpdate;
