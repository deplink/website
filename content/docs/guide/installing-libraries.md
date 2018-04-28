---
layout: docs/guide
title: Installing libraries
description: What should I do after cloning a project? How can I install new library? This article contains answers for asked questions.
menuGroup: Basic
order: 3
---

Installing libraries after cloning a project
--------------------------------------------

It's common situations when after cloning a project from version control system there isn't a `deplinks` directory. It can means that an author added this directory to the ignored ones. In such cases we should install missing libraries by calling the install command:

```bash
deplink install
```

First of all command will look for `deplink.lock` file which contains information about installed packages on the other machine. It's important to keep the same versions of packages on all machines to make build process determinable and repeatable. If file is missing then Deplink will resolve dependencies tree according to the constraints provided in the `deplink.json` file (it will try to use as newest as possible packages versions) and create `deplink.lock` file which should be always committed to the version control system.

If you would like to skip installing dependencies from `dev-dependencies` section then add the `--no-dev` flag:

```bash
deplink install --no-dev
```

Installing new libraries
------------------------

Installing dependencies is as simple as calling single command, for example to install [deplink/sample](https://repo.deplink.org/@deplink/sample) use:

```bash
deplink install deplink/sample
```

It's possible to install multiple packages using single command, separate further dependencies names using space:

```bash
deplink install deplink/sample example/package
```

To add new package to the `dev-dependencies` section add `--dev` flag:

```bash
deplink install deplink/sample --dev
```

After installation you should include `autoload.h` file or directly any of the libraries headers (see `deplinks/autoload.h` file for more details). We recommend to include the `autoload.h` file:

```cpp
#include "autoload.h"
```
