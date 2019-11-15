module.exports = function(app) {

    const errorCodes = require('../common/constants/api-error-codes');
    const bodyParser = require('body-parser');
    const AlertSettings = require('../models/alertSettingsModel');
    const jsonParser = bodyParser.json();

    app.put('/api/alert-settings', jsonParser, (req, res) => {
        let hasChanged = false;
        AlertSettings.findOne(function(err, alertSettings) {
            if (err) throw err;
            Object.keys(req.body.data).forEach(key => {
                if (alertSettings[key]) {
                    alertSettings[key] = req.body.data[key];
                    hasChanged = true;
                }
            })
            if (hasChanged) {
                alertSettings.__v++;
                alertSettings.save();
                res.send(errorCodes.SUCCESSFUL_MODIFICATION);
            } else {
                res.send(errorCodes.COMMON.NO_CHANGES_MADE);
            }
        });
    });
}
