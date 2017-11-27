---
layout: documentation/guide
title: Package File
description: The deplink.json schema. Explanation of the fields available in the package file.
menuGroup: Basic
order: 2
---

------------------

Table of Contents:
------------------

<!-- toc -->

------------------

name
----

Package name in format `<org>/<package>` (e.g. "deplink/example"). Both *org* and *package* may contains only alphanum and dash symbols. **Field value is required.**

**Note:** The field is considered redundant and may be removed in the future.

type
----

Destination of the project, can be either *project* or *library*:

- **project** - produces executable output,
- **library** - used for static and shared libraries.

**Field value is required.**

version
-------

Package version in [Semantic Versioning 2.0](https://semver.org) notation.

**Note:** The field is considered redundant and may be removed in the future.


include
-------

...

source
------

...

compiler
--------

...

linking
-------

...

dependencies
------------

...


dev-dependencies
----------------

...

define
------

...


repositories
------------

...
