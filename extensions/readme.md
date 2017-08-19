Extensions
==========

Directory containing globals, extensions and filters for template engine, more details can be found on the official nunjucks templating language documentation:

- [env.addFilter(name, func, [async])](https://mozilla.github.io/nunjucks/api.html#addfilter)
- [env.addExtension(name, ext)](https://mozilla.github.io/nunjucks/api.html#addextension)
- [env.addGlobal(name, value)](https://mozilla.github.io/nunjucks/api.html#addglobal)

Boilerplate
-----------

```
module.exports = function(env) {

    env.addGlobal(...);
    env.addFilter(...);
    env.addExtension(...);

};
```
