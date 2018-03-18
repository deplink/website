---
layout: docs/guide
title: undefined reference
description: 'Troubleshooting an error: "/path/to/file.c:6: undefined reference to "methodName" collect2: error: ld returned 1 exit status".'
menuGroup: Troubleshooting
order: 900
---

Context
-------

Problem occurs while building project written in C which uses libraries written in C++.

Problem
-------

Example output of build command which contains exception:

```
wojtek@vm:~/Downloads/hello-world$ deplink build --verbose
Retrieving installed dependencies... OK
Resolving dependencies tree... OK
Dependencies: 0 installs, 0 updates, 0 removals
Writing lock file... OK
Generating autoload header... OK
Dependencies: 0 builds, 1 up-to-date
Building project...
build/x86/hello-world.o: In function `main':
/home/wojtek/Downloads/hello-world/src/main.c:6: undefined reference to `sayHello'
collect2: error: ld returned 1 exit status
build/x64/hello-world.o: In function `main':
/home/wojtek/Downloads/hello-world/src/main.c:6: undefined reference to `sayHello'
collect2: error: ld returned 1 exit status
```

Solution
--------

We recommend to provide C linkage for C++ functions using the syntax:

```cpp
extern "C" void sayHello(const char* name);
```

See below issues for more information:

- [using C++ libraries in C project](https://stackoverflow.com/questions/22426574/gcc-undefined-reference-to),
- [what exactly does extern "C"](https://stackoverflow.com/questions/1041866/what-is-the-effect-of-extern-c-in-c).
