generator-kraken
================

Lead Maintainer: [Matt Edelmann](https://github.com/grawk)  

[![Build Status](https://travis-ci.org/krakenjs/generator-kraken.svg?branch=v1.1.2)](https://travis-ci.org/krakenjs/generator-kraken)  
[![NPM version](https://badge.fury.io/js/generator-kraken.png)](http://badge.fury.io/js/generator-kraken)  
[![Dependencies Status](https://david-dm.org/krakenjs/generator-kraken.png)](https://david-dm.org/krakenjs/generator-kraken)  
[![DevDependencies Status](https://david-dm.org/krakenjs/generator-kraken/dev-status.png)](https://david-dm.org/krakenjs/generator-kraken#info=devDependencies)  

Generator for scaffolding out Kraken applications.




## Getting Started

### :warning: Upgrading to 1.x?

Route registration has been [enhanced](https://github.com/krakenjs/express-enrouten/blob/a1d1117dd017b7371c4292ec379ea8070f6321f2/README.md#directory) with kraken 1.x. Please be aware that this changes where controllers are generated.

Already familiar with the generator? [Skip right to the new stuff](#warning-new-in-kraken-1x).

### Installation

```shell
$ [sudo] npm install -g yo generator-kraken bower
```
 
### Usage

```shell
$ yo kraken
```

### Generators

`$ yo kraken [myApp]`
Creates a new kraken application. Parameters:

    --templateModule - (Optional) Set the template module
    --cssModule - (Optional) Set the CSS module
    --jsModule - (Optional) Set the JavaScript module


`$ yo kraken:controller myController`  
Generates a new controller namespace called *myController* and it's dependencies.

`$ yo kraken:model myModel`  
Generates a new model named *myModel*.

`$ yo kraken:template myTemplate`  
Generates a new template named *myTemplate* and it's dependencies.

`$ yo kraken:locale myFile [myCountry myLang]`
Generates a new content bundle named *myFile*.




## Learning Your Way Around

Once installed, you can create a basic application by following the prompts.

```shell
$ yo kraken

     ,'""`.
    / _  _ \
    |(@)(@)|   Release the Kraken!
    )  __  (
   /,'))((`.\
  (( ((  )) ))
   `\ `)(' /'

[?] Application name: HelloWorld
...
```

To run your application, just go into the newly created directory and type `npm start`.

```shell
$ cd HelloWorld
$ npm start

> helloworld@0.0.1 start ~/HelloWorld
> node index.js

Listening on 8000
```


### Project Structure

- **/config/** - Application and middleware configuration
- **/controllers/** - Application routes
- **/locales/** - Country/language specific content bundles
- **/models/** - Controller models
- **/public/** - Web resources that are publicly available
- **/public/templates/** - Server and browser-side templates
- **/tests/** - Unit and functional test cases
- **/index.js** - Application entry point


### Configuration

Application configuration can be found in `/config/config.json`.

Different environment configuration can be loaded by creating an alternate file with the environment, e.g. `./config/development.json`. You can control which file is loaded by defining an environment variable, `NODE_ENV`, and setting its value to `production` or `development`.



### Controllers

Route logic is moved into the `/controllers/` directory.

For example, a route for your home page, would use a `/controllers/index.js` file such as:

```js
'use strict';

var IndexModel = require('../models/index');

module.exports = function (router) {
    var model = new IndexModel();

    router.get('/', function (req, res) {
        res.render('index', model);
    });
};
```

This file would define the routes and the logic for the home page. The advantage of keeping routes and logic segregated in individual files starts to show as the application grows. If something fails, it's very easy to pinpoint where things went wrong.

When a new controller is created, the generator will also create a template, locale file, and model for you.

##### :warning: **New in kraken 1.x**

Kraken 1.x now leverages [express 4](http://www.expressjs.com) and, most notably, passes a [router](http://expressjs.com/4x/api.html#router) into your controllers.

Additionally, routes are now—by default—automatically determined for you based on directory structure. For example, if we wanted to have a number of routes that start with `/users`, we could simply create a `/controllers/users/index.js` file with the following contents:

```js
'use strict';

module.exports = function (router) {
    // note that we don't need to specify "/users"
    router.get('/', function (req, res) {
        res.send('You can find me at /users');
    });

    router.get('/new', function (req, res) {
        res.send('You can find me at /users/new');
    });
}

```

Calling `yo kraken:controller users` would be enough to generate the basis for that file. Want to register routes that begin with `/users/all`? `yo kraken:controller users/all` is the command you're looking for.

Route registration is highly customizable. If you're interested in trying a different behavior, be sure to check out the module that takes care of it in kraken: [express-enrouten](https://github.com/krakenjs/express-enrouten).

### Models

Data models are separated from the controller logic resulting in cleaner, more organized code. Data models live in the `/models/` folder.

```js
'use strict';

module.exports = function IndexModel() {
    return {
        name: 'myApp'
    };
};
```

While not very complex, this model serves as a base to build upon.



### Templates

[Dust JavaScript templates](https://github.com/linkedin/dustjs) are the default templating language.

Templates are loaded from the `/public/templates/` directory. Since they exist in the public folder the application can render the same templates on the server side as well as the client side.


### Localized Content

When using Dust for it's templating, the application is able to load localized templates. If we wanted to greet a user in their native language, we would simply add this context to the response before rendering the template:

```js
function (req, res) {
	res.locals.context = { locality: 'es_ES' };

	res.render('index', {
	    name: 'Antonio Banderas'
	});
}
```

We would also change our template as follows, using a `@pre` content tag:

```html
<h1>{@pre type="content" key="index.greeting"/}</h1>
```

This instructs the application to pick up the `index.greeting` string from the appropriate locale content bundle in the `/locales/` directory, in this case `/locales/ES/es/`.




## License

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)
