---
layout: docs/guide
title: Package File
description: The deplink.json schema. Explanation of the fields available in the package file.
menuGroup: Basic
order: 2
---

name
----

Package name in format `<org>/<package>` (e.g. "deplink/example"). Both *org* and *package* may contains only alphanum and dash symbols. **Field value is required.**

```json
"name": "org/package"
```

**Note:** The field is considered redundant and may be removed in the future.

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

**Note:** The field is considered redundant and may be removed in the future.


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

Inform which compilers (as well as versions) are supported. Version must follow [version constraints](/docs/guide/version-constraints) conventions. Currently only GCC is supported.

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

**Note:** In future order of array items could have an impact for algorithm and first linking type could be used in case if user not defined strictly which one would like to use.

dependencies
------------

...


dev-dependencies
----------------

Additional dependencies installed only for root package in dev environment. See [dependencies](#dependencies) section for more information.

define
------

...


repositories
------------

...
