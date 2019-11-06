let express = require('express');
let app = express();
let userApi = require('./api/userApi');
let mongoose = require('mongoose');
let config = require('./config');

mongoose.set('useCreateIndex', true);
mongoose.connect(config.getDbConnectionString(), { useUnifiedTopology: true, useNewUrlParser: true });

userApi(app);

app.listen(config.getServerDetails().port || 3000);

