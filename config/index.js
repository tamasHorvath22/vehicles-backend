const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    getDbConnectionString: function() {
        return `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0-m8z4s.mongodb.net/vehicles?retryWrites=true&w=majority`;
    },
    getServerDetails: function() {
        return { BASE_URL: process.env.BASE_URL, PORT: process.env.PORT };
    },
    getJwtPrivateKey: function () {
        return process.env.JWT_PRIVATE_KEY;
    },
    getJwtPublicKey: function () {
        return process.env.JWT_PUBLIC_KEY;
    }
};
