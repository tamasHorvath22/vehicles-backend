let express = require('express');
let app = express();
let api = require('./api/api');
let mongoose = require('mongoose');
let config = require('./config');

mongoose.set('useCreateIndex', true);
mongoose.connect(config.getDbConnectionString(), { useUnifiedTopology: true, useNewUrlParser: true });

api(app);

app.listen(config.getServerDetails().port || 3000);

