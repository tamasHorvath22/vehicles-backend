let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let alertSettingsSchema = new Schema({
    runAt: { type : Number, required : true },
    period: { type : String, required : true }
}, { timestamps: true });

module.exports = mongoose.model('AlertSettings', alertSettingsSchema);;
