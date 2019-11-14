const AlertSettings = require('../models/alertSettingsModel');
const alertPeriods = require('../common/constants/check-alert-periods');

module.exports = function () {
    AlertSettings.find(function(err, vehicles) {
        if (err) throw err;
        if (vehicles.length) return;

        let settings = AlertSettings({
            runAt: 8,
            period: alertPeriods.DAILY
        });
        settings.save();
    });
}
