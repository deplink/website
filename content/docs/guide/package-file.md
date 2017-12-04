---
layout: docs/guide
title: Package File
description: The deplink.json schema is the most important file in the whole package. Each field of this file describes how the package should be builded or interact with other packages.
menuGroup: Basic
order: 2
---

name
----

Package name in format `<org>/<package>` (e.g. "deplink/example"). Both *org* and *package* may contains only alphanum and dash symbols. **Field value is required.**

```json
"name": "org/package"
```

type
----

Destination of the project, can be either *project* or *library*:

- **project** - produces executable output,
- **library** - used for static and shared libraries.

```json
"type": "project"
"type": "library"
```

**Field value is required.**

version
-------

Package version in [Semantic Versioning 2.0](https://semver.org) notation.

```json
"version": "2.0.7"
```


include
-------

Directory name(s) with header files (.h or .hpp). For example gcc will resolve it as a `-I <include>` command option.

Multiple header directories are allowed:

```json
"include": "core/include"
"include": ["core/include", "module-a/include"]
```

**Note:** By default *"include"* directory is used.

source
------

Directory name(s) with source files (.c or .cpp).

Multiple source directories are allowed:

```json
"include": "core/src"
"include": ["core/src", "module-a/src"]
```

**Note:** By default *"src"* directory is used.

compiler
--------

Inform which compilers (as well as versions) are supported. Version must follow [version constraints](/docs/guide/constraints#version-constraints) conventions. Currently only GCC is supported.

```
"compilers": {
    "gcc": "^5.0"
}
```

**Note:** Field is not required, but it's highly recommended to set. When leave empty then other packages will assume that any compiler in any version is supported.

linking
-------

Determine the library linking type, used only along with library type. **Set to *static*, *dynamic* or array containing both of these values.** It's an information for dependants projects and libraries which linking type is available.

```json
"linking": "static"
"linking": "dynamic"
"linking": ["static", "dynamic"]
```

dependencies
------------

Define dependencies required to build and/or run the application. Dependencies can be added manually or via the [install](/docs/reference/install) command. Version must follow [constraints](/docs/guide/constraints) conventions and can contain additional constraint after the `:` symbol to set preferred linking type (available only for dependencies which support both linking types).

```json
"dependencies": {
    "org/package": "^3.0:static",
    "deplink/example": "^0.5.6"
}
```

dev-dependencies
----------------

Additional dependencies installed only for root package in dev environment.

```json
"dev-dependencies": {
    "unit/tests": "^1.3"
}
```

See [dependencies](#dependencies) section for more information.

define
------

Macro definitions can be defined not only in the code, but also inside the package file separately for debug and release mode.

```json
"define": {
    "debug": {
        "LOG_ENABLED": true,
        "LOG_LEVEL": "Warnings"
    },
    "release": {
        "LOG_ENABLED": false
    }
}
```

**Important:** Behavior of this field could change in future due to currently unresolved issue of macro naming conflicts. Probably macros defined in code will be prepended with unique hash and only macros defined inside the package file will be visible for other packages.

repositories
------------

Describe in which repositories package will be looking for dependencies. If dependency exists in a few of the defined repositories then the first one will be used. It means that the **order of repositories is important**.

These repositories will be used also for installing nested dependencies. If any of your dependencies use custom repository to install other dependencies then we have to include this repository also in the root package, otherwise installation will fail because dependency won't be finded.

```json
"repositories": [
    {
        "type": "local",
        "src": "/path/to/repo"
    }
]
```

See [list of available repositories](/docs/guide/repositories) for more information.

**Note:** In most cases you won't need to define this property, because [Official Online Repository](https://repo.deplink.org) will be used as a fallback repository. Fallback repository is used when the dependency not exists in any of the defined repositories.
