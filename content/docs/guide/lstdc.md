---
layout: docs/guide
title: -lstdc++
description: 'Troubleshooting an error: "/usr/bin/ld: skipping incompatible /usr/lib/gcc/x86_64-linux-gnu/5/libstdc++.a when searching for -lstdc++ /usr/bin/ld: cannot find -lstdc++".'
menuGroup: Troubleshooting
order: 900
---

Context
-------

Problem occurs while compiling project using **g++ on Linux**.

Problem
-------

Example output of build command which contains exception:

```
wojtek@vm:~/Downloads/hello-world$ deplink build
Retrieving installed dependencies... Skipped
Resolving dependencies tree... OK
Dependencies: 1 installs, 0 updates, 0 removals
  - Installing deplink/sample (0.1.0)        
Writing lock file... OK
Generating autoload header... OK
Dependencies: 1 builds, 0 up-to-date
  - Building deplink/sample
/usr/bin/ld: skipping incompatible /usr/lib/gcc/x86_64-linux-gnu/5/libstdc++.so when searching for -lstdc++
/usr/bin/ld: skipping incompatible /usr/lib/gcc/x86_64-linux-gnu/5/libstdc++.a when searching for -lstdc++
/usr/bin/ld: cannot find -lstdc++
collect2: error: ld returned 1 exit status
```

Solution
--------

Install missing library `g++-multilib`. You can also install library for both gcc and g++:

```
apt-get install gcc-multilib g++-multilib
```
