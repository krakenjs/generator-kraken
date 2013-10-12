# generator-kraken

[Yeoman](http://yeoman.io) generator for Kraken applications.


## Getting Started


### Installation

`npm install -g yo git+https://github.com/paypal/generator-kraken.git`

Or, if you have already [set up your SSH key for use with GitHub](https://help.github.com/articles/generating-ssh-keys), you can use:

`npm install -g yo git+ssh://git@github.com/paypal/generator-kraken.git`


### API

`yo kraken` - Creates a new kraken application

`yo kraken:page myPage` - Generates a new controller, model, content bundle, and template named *myPage*.

`yo kraken:controller myController` - Generates a new controller named *myController*.

`yo kraken:model myModel` - Generates a new model named *myModel*.

`yo kraken:template myTemplate` - Generates a new template named *myTemplate*.

`yo kraken:locale myFile myCountry myLang` - Generates a new content bundle named *myFile*. Both *myCountry* and *myLang* are optional.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
