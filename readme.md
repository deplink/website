Getting Started
---------------

### Prerequisites

You're going to need:

- **NPM >=5** - website is built on the [Gulp](https://gulpjs.com) (without any static HTML generators)
- **PHP >=5.6** - development mode use [PHP built-in server](http://php.net/manual/en/features.commandline.webserver.php)

### Getting Set Up

Install required dependencies (`npm install`) and run either `npm run prod` or `npm run dev`.

**Production mode** (`npm run prod`) generates output used for publishing new version of the website. In most cases you'd not need to use this mode.

**Development mode** (`npm run dev`) build output compatible with the browsersync. This mode aromatically starts PHP built-in server as well as browsersync and open appropriate url in your browser. 

License
-------

Code licensed under the [MIT License](https://opensource.org/licenses/MIT) and the docs are licensed under the [CC BY 3.0](https://creativecommons.org/licenses/by/3.0).
