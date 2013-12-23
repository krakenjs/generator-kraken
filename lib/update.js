'use strict';

var updateNotifier = require('update-notifier');

module.exports.check = function check() {
    var notifier = updateNotifier({
        updateCheckInterval: 1000 * 60 * 60 * 24, // 1 day
        packagePath: '../package.json'
    });

    if (notifier.update) {
        notifier.notify();
    }
};
