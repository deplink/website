---
layout: docs/reference
title: Build Command
description: Build project and related project dependencies. Command execution is prepended with installation of missing dependencies.
menuTitle: build
menuGroup: Basic
---

Usage
-----

```
deplink build [options]
```

Options
-------

- `--no-dev` - skip installation packages from the "dev-dependencies" section,
- `-v`, `--verbose` - print commands executed by the compiler,
- `--no-progress` - outputs only steps without showing dynamic progress,
- `-c NAME`, `--compiler=NAME` - force to use specified compiler regardless to the deplink.json settings,
- `-d`, `--working-dir=WORKING-DIR` - use the given directory as a working directory.
