const AlertSettings = require('../models/alertSettingsModel');
const alertPeriods = require('../common/constants/check-alert-periods');

module.exports = function () {
    AlertSettings.find(function(err, oldSettings) {
        if (err) throw err;
        if (oldSettings.length) return;

        let settings = AlertSettings({
            runAt: 8,
            period: alertPeriods.DAILY
        });
        settings.save();
    });
}
