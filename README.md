# generator-kraken

[Yeoman](http://yeoman.io) generator for Kraken applications.

[![Build Status](https://travis-ci.org/paypal/generator-kraken.png)](https://travis-ci.org/paypal/generator-kraken)
[![NPM version](https://badge.fury.io/js/generator-kraken.png)](http://badge.fury.io/js/generator-kraken)
[![Dependencies Status](https://david-dm.org/paypal/generator-kraken.png)](https://david-dm.org/paypal/generator-kraken)
[![DevDependencies Status](https://david-dm.org/paypal/generator-kraken/dev-status.png)](https://david-dm.org/paypal/generator-kraken#info=devDependencies)


## Getting Started


### Installation

```shell
$ npm install -g yo generator-kraken
```


### API

`yo kraken [appName]`
Creates a new kraken application. Optional parameter `appName` creates the application using the supplied name.

`yo kraken:page myPage`  
Generates a new controller, model, content bundle, and template named *myPage*.

`yo kraken:controller myController`  
Generates a new controller named *myController*.

`yo kraken:model myModel`  
Generates a new model named *myModel*.

`yo kraken:template myTemplate`  
Generates a new template named *myTemplate*.

`yo kraken:locale myFile myCountry myLang`  
Generates a new content bundle named *myFile*. Both *myCountry* and *myLang* are optional.


## License

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)
