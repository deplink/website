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

Processing Workflow
-------------------

### Website Content

Each markdown file is associated with unique url which is resolved from file path (e.g. `content/community/partners.md` will be available under the `https://deplink.com/community/partners` url).

Markdown files placed in the `content` directory have following processing workflow (files are processed in random order):

1. **Extract front matter from markdown**, extracted data will be available in layout under the `page` variable, e.g. `{{ page.title }}`),
1. **Transform markdown to HTML**, use `{% block markdown %}{% endblock %}` to insert HTML in layout),
1. **Attach `app.json` data**, file object will be bind in layout to the `app` variable (example usage: `{{ app.host }}`),
1. **Mount extensions** defined in the `extensions` directory (see `extensions/readme.md` file for more details),
1. **Render view** specified in the front matter (the `layout` variable),
1. **Minify HTML output**, more details can be found in [project quick reference](https://github.com/kangax/html-minifier),
1. **Save output to the `build` directory** under the same path as the source markdown file and using the same file name (with .html extension).

### Resources

All sections listed below are processed in parallel:

- **Libraries** - almost all files (except this files which name starts with the *"_"* symbol) from the `template/libraries` directory are copied to the `build/libraries`. Directory structure is preserved.
- **Images** - images from the `template/images` directory are compressed and copied to the `build/images`. Directory structure is preserved.
- **Scripts** - the `template/scripts/app.js` script is processed using browserify and minified. Output is saved to the `build/compiled/app.js` file.
- **Styles** - the `template/scripts/app.scss` style is processed using sass and minified. Output is stored in the `build/compiled/app.css` file.

License
-------

Code licensed under the [MIT License](https://opensource.org/licenses/MIT) and the docs are licensed under the [CC BY 3.0](https://creativecommons.org/licenses/by/3.0).
