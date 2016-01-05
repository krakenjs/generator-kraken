# CHANGELOG

## v2.2.2

* Change default linter to ESLint via #205

## v2.2.1

* Add EJS conditions and variables into generated controller unit tests. Fixes #161

## v2.2.0

* Fix warning of missing bower.json file when bower is selected
* Fix broken include of browser library when requirejs is chosen but bower is not chosen
  * minor version bump because of the addition of a postinstall task, and new modules `copy-browser-modules` and `grunt-copy-browser-modules`
  
## v2.1.2

* Make Dust templates render without whitespace suppression in development environment
* Fix minor bug that prevents the app name from being read directly from CLI
* add contributors to package.json

## v2.1.1

* add an error when bower is requested but not installed on the end user's system

## v2.1.0

* replaces `kraken-devtools` with `construx` and its suite of separate plugin modules
* fixes #174 by replacing properties file based dust templates with inline content based dust templates
* fixes #164 by using `construx-sass` for development mode, and upgrades `grunt-sass` to the `node-sass@3.0` compatible version
* upgrades stylus support to `^0.50.0`

## v2.0.1

* fixes #176 by surrounding comma-separated task list with `[]` in the Gruntfile `build` task definition

## v2.0.0

* new makara/internationalization support
* refactor for maintainability
* move config values from package.json to .yo-rc.json
* modernize and use new yeoman infrastructure
* Several bug fixes

## v1.2.0

* Upgrading to kraken-js v1.0.3
* Upgrading to kraken-devtools 1.2.1
* Upgrading to engine-munger 0.2.5
* Upgrading to express 4.12.2
* Upgrading to grunt 0.4.5
* Upgrading to grunt-contrib-clean 0.6.0.
* Upgrading to requirejs 2.1.16
* Upgrading to grunt-browserify 3.5.1
* Upgrading to node-sass 2.0.1
* Upgrading to grunt-sass 0.18.1
* Upgrading to dustjs-linkedin to 2.6.1
* Upgrading to dustjs-linkedin-helpers 1.6.1.
* Upgrading to grunt-dustjs 1.2.1.
* Upgrading to update-notifier 0.3.1
* Updated update.js to work with new version of update-notifier
* Upgarding to chalk 1.0.0
* Fix generator to work correctly with node 0.12.0 
* Fix contoller to create json files correctly


## v1.0.0

* Upgrading to kraken-js v1.0.0
* Controller generator follows new controller implementation


## v0.7.1

* Fixes crash in versions of `yo` < 1.1.x
* Fixes dependency install issues in Windows


## v0.7.1

* Updating node dependencies to use ^
* Latest dustjs minor version used automatically
* Adds support for deep linked pages in subgenerator (#49)
* Breaks apart Grunt tasks 
* RequireJS configration fixes (#46, #54)
* Sub-generators generate dependencies (#68)
* Bower dependencies are now scaffolded out
* Fixes mochacli options (#83)
* More test cases!


## v0.7.0

* Updating kraken dependency to 0.7
* Bumping version number to have generator and kraken in sync on minor versions
* Updating CLI to accept a project name as first argument


## Fast forward...


## v0.0.3

* Fixes issue #27; Moves update-notifier to dependencies


## v0.0.2

* Scaffolds a model for each controller
* Scaffolds a test case for each controller
* Scaffolds and hooks up basic error pages
* Sets up Grunt to copy over non-compiled assets during build
* Adding commented defaults to config/middleware.json
* Notifies users when an update exists


## v0.0.1

* Made require.js a parameter when generation an app
* Fixed 404 from require.js


## v0.0.0

* Initial release
