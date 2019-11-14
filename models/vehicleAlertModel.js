let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let vehicleAlerteSchema = new Schema({
    action: { type : String, required: true },
    alertDistance: { type : Number },
    alertDate: { type : Number },
    alertWorkHours: { type : Number },
    alertSent: { type: Boolean, default: false }
}, { timestamps: true });

let VehicleAlert = mongoose.model('VehicleAlert', vehicleAlerteSchema);

module.exports = {
    model: VehicleAlert,
    schema: vehicleAlerteSchema
};
