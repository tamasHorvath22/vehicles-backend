let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: { type : String, unique : true, required : true, dropDups: true },
    password: String
});

let User = mongoose.model('User', userSchema);

module.exports = User;
