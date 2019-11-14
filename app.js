const express = require('express');
const app = express();
const api = require('./api/api');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.set('useCreateIndex', true);
mongoose.connect(config.getDbConnectionString(), { useUnifiedTopology: true, useNewUrlParser: true });

api(app);

app.listen(config.getServerDetails().PORT || 3000);

