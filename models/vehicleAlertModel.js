let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let vehicleAlerteSchema = new Schema({
    action: { type : String, required: true },
    alertDistance: { type : Number },
    alertDate: { type : Number },
    alertWorkHours: { type : Number },
    savedAt: { type : Number },
    modifiedAt: { type : Number },
    alertSent: { type: Boolean, default: false }
});

let VehicleAlert = mongoose.model('VehicleAlert', vehicleAlerteSchema);

module.exports = VehicleAlert;
