'use strict';


module.exports = function spec() {
    return {
        onconfig: function (config, next) {
            next(null, config);
        }
    };
};