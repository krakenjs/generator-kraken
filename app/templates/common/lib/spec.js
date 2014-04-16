'use strict';


module.exports = function spec(app) {

    return {
        onconfig: function (config, next) {<% if (i18n) { %>
            config.get('view engines:js:renderer:arguments').push(engine, app);
            <% } %>
            next(null, config);
        }
    };
};