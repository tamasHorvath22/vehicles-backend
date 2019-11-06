let configValues = require('./config');

module.exports = {
    getDbConnectionString: function() {
        return 'mongodb+srv://' + configValues.database.username + ':' +
        configValues.database.password + '@cluster0-m8z4s.mongodb.net/test?retryWrites=true&w=majority'
    },
    getServerDetails: function() {
        return configValues.server;
    }
};
