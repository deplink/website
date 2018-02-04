---
layout: docs/reference
title: Build Command
description: Build project and related project dependencies. Command execution is prepended with installation of missing dependencies.
menuTitle: build
menuGroup: Basic
order: 10
---

Usage
-----

```
deplink build [options]
```

Options
-------

- `--no-dev` - skip installation packages from the "dev-dependencies" section,
- `--no-progress` - outputs only steps without showing dynamic progress,
- `-d`, `--working-dir=WORKING-DIR` - use the given directory as a working directory.
