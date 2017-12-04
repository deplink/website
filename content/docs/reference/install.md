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
deplink install [options]
```

Options
-------

- `--no-dev` - skip installation packages from the "dev-dependencies" section,
- `--no-progress` - outputs only steps without showing dynamic progress,
- `-d`, `--working-dir=WORKING-DIR` - use the given directory as working directory.
