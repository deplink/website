---
layout: docs/guide
title: sys/cdefs.h
description: 'Troubleshooting an error: "In file included from /usr/include/stdio.h:27:0: /usr/include/features.h:374:25: fatal error: sys/cdefs.h: No such file or directory".'
menuGroup: Troubleshooting
order: 900
---

Context
-------

Problem occurs while compiling project using gcc or g++.

Problem
-------

Example output of build command which contains exception:

```
root@461c43268c63:~/workspace# deplink build
Retrieving installed dependencies... Skipped
Resolving dependencies tree... OK
Dependencies: 0 installs, 0 updates, 0 removals
Writing lock file... OK
Generating autoload header... OK
Dependencies: 0 builds, 0 up-to-date
Building project...
In file included from /usr/include/stdio.h:27:0,
                 from src/main.c:1:
/usr/include/features.h:374:25: fatal error: sys/cdefs.h: No such file or directory
 #  include <sys/cdefs.h>
                         ^
compilation terminated.
```

Solution
--------

Install missing library `gcc-multilib`. You can also install library for both gcc and g++:

```
apt-get install gcc-multilib g++-multilib
```
