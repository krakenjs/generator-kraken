'use strict';


module.exports = function spec(app) {

    return {
        onconfig: function (config, next) {<% if (i18n || specialization) { %>
            var i18n = config.get('i18n'),
                specialization = config.get('specialization'),
                args;

            // Setup dev-tools for i18n compiling
            if (i18n && config.get('middleware:devtools')) {
                args = config.get('middleware:devtools:arguments');
                args[2].dust.i18n = i18n;
                config.set('middleware:devtools:arguments', args);
            }

            // Setup engine-munger for i18n and / or specialization
            var engine = {
                'views': config.get('express:views'),
                'view engine': config.get('express:view engine'),
                'specialization': specialization,
                'i18n': i18n
            };

            if (config.get('view engines:dust')) {
                config.get('view engines:dust:renderer:arguments').push(engine);
            }

            config.get('view engines:js:renderer:arguments').push(engine, app);
            <% } %>
            next(null, config);
        }
    };
};