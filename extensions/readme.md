Extensions
==========

Directory containing globals, extensions and filters for template engine, more details can be found on the official nunjucks templating language documentation:

- https://mozilla.github.io/nunjucks/api.html#addfilter
- https://mozilla.github.io/nunjucks/api.html#addextension

Boilerplate
-----------

```
module.exports = function(env) {

    env.addGlobal(...);
    env.addFilter(...);
    env.addExtension(...);

};
```
