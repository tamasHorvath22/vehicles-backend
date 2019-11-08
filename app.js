let express = require('express');
let app = express();
let userApi = require('./api/userApi');
let vehicleApi = require('./api/vehicleApi');
let vehicleAlertApi = require('./api/vehicleAlertApi');
let mongoose = require('mongoose');
let config = require('./config');

mongoose.set('useCreateIndex', true);
mongoose.connect(config.getDbConnectionString(), { useUnifiedTopology: true, useNewUrlParser: true });

userApi(app);
vehicleApi(app);
vehicleAlertApi(app);

app.listen(config.getServerDetails().port || 3000);

