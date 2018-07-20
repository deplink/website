---
layout: docs/reference
title: Install Command
description: Install dependencies listed in the deplink.lock or in the deplink.json if lock file is missing or outdated.
menuTitle: install
menuGroup: Basic
---

Usage
-----

```bash
deplink install [options] [<package>]...
```

Below table demonstrates whether specified packages will be added to the `dependencies` or `dev-dependencies` (the *"Section"* column) and whether installation will include `dev-dependencies` (the "*Install dev"* column).

| Command | Section | Install dev |
|---|---|---|
| `deplink install` | n/a | Yes |
| `deplink install --dev` | n/a | Yes |
| `deplink install --no-dev` | n/a | No |
| `deplink install deplink/sample` | `dependencies` | Yes |
| `deplink install deplink/sample --dev` | `dev-dependencies` | Yes |
| `deplink install deplink/sample --no-dev` | `dependencies` | No |

Additionally while specifying the `package` argument you can include custom version constraint and linking type constraint. If version is omitted then Deplink will force project to use version compatible to the newly installed one. Omitting the linking type will result in using a linking type preferred by the library.

**Package argument format:**
- `<package-name>[:[<version>][:<linking-type>]]`.

**Example commands:**
- `deplink install hello/world:^1.3`, 
- `deplink install hello/world::static`,
- `deplink install hello/world:2.*:dynamic`.

Arguments
---------

- `package` - names of the packages to add before installation.

Options
-------

- `--dev` - add optional packages to "dev-dependencies" section,
- `--no-dev` - skip installation packages from the "dev-dependencies" section,
- `--no-progress` - outputs only steps without showing dynamic progress,
- `-d`, `--working-dir=WORKING-DIR` - use the given directory as working directory.
