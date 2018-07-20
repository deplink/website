---
layout: docs/reference
title: List Command
description: List project dependencies. Summary includes dependencies which aren't directly defined in the deplink.json file (nested dependencies).
menuTitle: list
menuGroup: Basic
---

Usage
-----

```
deplink list [options]
```

Options
-------

- `--no-dev` - skip printing packages from the "dev-dependencies" section,
- `-d`, `--working-dir=WORKING-DIR` - use the given directory as a working directory.
