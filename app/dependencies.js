'use strict';


module.exports = {

    "dust": {
        "npm": [
            "dustjs-linkedin@~2.0.3",
            "dustjs-helpers@^1.1.1",
            "adaro@^0.1.0",
            "makara@^0.3.0"
        ],
        "npmDev": [
            "grunt-dustjs@^1.2.0"
        ]
    },

    "grunt": {
        "npmDev": [
            "grunt@^0.4.1",
            "grunt-contrib-clean@^0.5.0",
            "grunt-contrib-jshint@^0.6.4",
            "grunt-mocha-cli@^1.5.0",
            "grunt-copy-to@^0.0.10",
            "grunt-config-dir@^0.3.2"
        ]
    },

    "less": {
        "npm": [
            "less@^1.6.1"
        ],
        "npmDev": [
            "grunt-contrib-less@^0.9.0"
        ]
    },

    "requirejs": {
        "bower": [
            "requirejs"
        ],
        "npm": [
            "requirejs@^2.1.11"
        ],
        "npmDev": [
            "grunt-contrib-requirejs@^0.4.3"
        ]
    }

};