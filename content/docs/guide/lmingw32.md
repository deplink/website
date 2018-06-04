---
layout: docs/guide
title: -lmingw32
description: 'Troubleshooting an error: "x86_64-w64-mingw32/bin/ld.exe: skipping incompatible x86_64-w64-mingw32/lib/libmingw32.a when searching for -lmingw32 x86_64-w64-mingw32/bin/ld.exe: cannot find -lmingw32".'
menuGroup: Troubleshooting
order: 900
---

Context
-------

Problem occurs while compiling project **using gcc on Windows** (MinGW64).

Problem
-------

Your gcc compiler doesn't support either `-m32` or `-m64` flag which instruct compiler to use the `x86` or `x86_64` architecture. MinGW supports compiling either 32 or 64 bit applications depending on the installed MinGW architecture.

Example gcc output containing exception:

```
x86_64-w64-mingw32/bin/ld.exe: skipping incompatible x86_64-w64-mingw32/lib/libmingw32.a when searching for -lmingw32
x86_64-w64-mingw32/bin/ld.exe: cannot find -lmingw32
x86_64-w64-mingw32/bin/ld.exe: skipping incompatible x86_64-w64-mingw32/5.3.0/libgcc.a when searching for -lgcc
x86_64-w64-mingw32/bin/ld.exe: cannot find -lgcc
x86_64-w64-mingw32/bin/ld.exe: skipping incompatible x86_64-w64-mingw32/5.3.0/libgcc_eh.a when searching for -lgcc_eh
x86_64-w64-mingw32/bin/ld.exe: cannot find -lgcc_eh
x86_64-w64-mingw32/bin/ld.exe: skipping incompatible x86_64-w64-mingw32/lib/libmoldname.a when searching for -lmoldname
x86_64-w64-mingw32/bin/ld.exe: cannot find -lmoldname
(...)
collect2.exe: error: ld returned 1 exit status OK
```

Solution
--------

We recommend to use the [TDM64](http://tdm-gcc.tdragon.net). It supports both 32b and 64b binaries while MinGW support only one of the architectures. See the [StackOverflow](https://stackoverflow.com/questions/21980774/what-is-the-difference-between-orwells-mingw-and-tdm-dev-c-versions) issue for more information.
