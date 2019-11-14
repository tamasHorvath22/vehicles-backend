let mongoose = require('mongoose');
let vehicleAlert = require('./vehicleAlertModel');
let Schema = mongoose.Schema;

let vehicleSchema = new Schema({
    make: { type : String },
    type: { type : String },
    vehicleType: { type: String, required: true },
    licence: { type : String },
    drivenDistance: { type : Number },
    workHours: { type : Number },
    alerts: [ vehicleAlert.schema ]
}, { timestamps: true });

let Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
