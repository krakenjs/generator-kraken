# generator-kraken

Generator for scaffolding out Kraken applications.

[![Build Status](https://travis-ci.org/krakenjs/generator-kraken.png)](https://travis-ci.org/krakenjs/generator-kraken)
[![NPM version](https://badge.fury.io/js/generator-kraken.png)](http://badge.fury.io/js/generator-kraken)
[![Dependencies Status](https://david-dm.org/krakenjs/generator-kraken.png)](https://david-dm.org/krakenjs/generator-kraken)
[![DevDependencies Status](https://david-dm.org/krakenjs/generator-kraken/dev-status.png)](https://david-dm.org/krakenjs/generator-kraken#info=devDependencies)


## Getting Started


### Installation

```shell
$ [sudo] npm install -g yo generator-kraken
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
Generates a new controller named *myController* and it's dependencies.

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

Application configuration can be found in `/config/app.json`.

Different environment configuration can be loaded by creating an alternate file with the environment as a suffix, e.g. `./config/app-development.json`. You can control which file is loaded by defining an environment variable, `NODE_ENV`, and setting its value to `production` or `development`.



### Controllers

Route logic is moved into the `/controllers/` directory.

For example, a route for your home page, would use a `/controllers/index.js` file such as:

```js
'use strict';

var IndexModel = require('../models/index');

module.exports = function (server) {
    var model = new IndexModel();
 
    server.get('/', function (req, res) {
        res.render('index', model);
    });
};
```

This file would define the routes and the logic for the home page. The advantage of keeping routes and logic segregated in individual files starts to show as the application grows. If something fails, it's very easy to pinpoint where things went wrong.

When a new controller is created, the generator will also create a template, locale file, and model for you.



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
