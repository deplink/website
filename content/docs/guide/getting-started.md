---
layout: docs/guide
title: Getting Started
description: Deplink is a console application to automate process of downloading, building and linking dependencies in C/C++ projects. Deplink allows you to create your own packages which you can share within the company or make it public.
menuGroup: Basic
order: 1
---

Main features
--------

- **Ease of use** - installation and creating a first project is a breeze.
- **Focus on security** - with private repository all your private data will remain inside your infrastructure. Everything can be available only within your private network.
- **Driven by community** - project as well as libraries are created by community, everyone can support the project and add new libraries.
- **Open Source** - the tool will always be Open Source and available for free, only on the site may appears advertisements from sponsors.

Installation
------------

Installation is described in the [Download](/download) section. Choose your preferred option and follow instructions posted below the download buttons.

In all materials I assume that you have installed deplink globally and it's available under the `deplink` command. If for some reason you didn't add the application to the *PATH* then please keep this in mind while reading the documentation.

First project
-------------

We'll create simple *Hello, World* console application without any dependencies. To do that create empty directory, open console in that location and type `init` command to create `deplink.json` file:

```bash
deplink init
```

In `src/main.cpp` file put simple *Hello, World* code:

```cpp
#include <cstdio>

int main() {
	printf("Hello, World!");
	return 0;
}
```

To build project use `build` command:

```bash
deplink build
```

That's all! Your program is available under the `build` directory.
