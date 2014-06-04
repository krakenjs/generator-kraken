'use strict';


module.exports = function spec(app) {

    return {
        onconfig: function (config, next) {
            next(null, config);
        }
    };
};