---
layout: docs/reference
title: Run Command
description: Run project executable file with optional arguments.
menuTitle: run
menuGroup: Basic
---

Usage
-----

```
deplink run [options] [--] [<args>]...
```

Arguments
---------

- `args` - optional arguments and options passed to the executable file (must be prepended with the ` -- ` sequence).

Options
-------

- `--arch=ARCH` - run binary compiled for specified architecture,
- `-t`, `--timeout=TIMEOUT` - program execution timeout \[s\] (disabled by default),
- `-d`, `--working-dir=WORKING-DIR` - use the given directory as a working directory.
