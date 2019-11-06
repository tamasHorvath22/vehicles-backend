let mongoDb = {

    Schema: null,
    shemas: {
        userSchema: new Schema({
            username: String,
            password: String
        }),
        vehileSchema: new Schema({
            type: String,
            year: Number,
            color: String
        })
    },

    initDb: function() {
        
        this.Schema = mongoose.Schema;
    }
}

module.exports = mongoDb;