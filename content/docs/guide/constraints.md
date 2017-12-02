---
layout: docs/guide
title: Constraints
description: Constraints are a set of rules to define which version should be used along with additional constraints. It's highly important to use correct constraint to narrowing possible case of use to supported ones.
menuGroup: Advanced
order: 500
---

Version constraints
-------------------

**Greater, lower or equal operators**

The most basic constraint is an equal operator, e.g. `5.3.1` means that we want to use specified version. A bit more advanced are operators like `>`, `>=`, `<` and `<=`.

**Connecting constraints**

Constraints can be connected using *"or"* operator `x || y` or using the *"and"* operator `x y`. Example:

```
# Allow versions ^5.3 and ^6.0
# (more about "^" operator later).
^5.3 || ^6.0

# Allows versions greater than 5.3.2
# but lower or equal the version 5.8.0.
>5.3.2 <=5.8
```

**Compatibility version**

Most used operator, it allows to define that we'd like to use version which is compatible with other version. Let's take for example the `^5.2` constraint, it's equal to the constraint `>=5.2.0 <6.0.0`. Of course all packages must follow the [Semantic Versioning](https://semver.org) and follow the minor/patch versions usage.

Additional constraints
----------------------

After the `:` symbol you can place additional constraints. These constraints are available only in specified context and can be connected using `,` operator. Using some constraints from the same group works as using the *"or"* operator inside this group and *"and"* operator between groups (unnamed groups are treated as different).

| Context | Group | Constraint | Description |
|---------|-------|------------|-------------|
| Dependency | - | **static** | Force to use static linking type. |
| Dependency | - | **dynamic** | Force to use dynamic linking type. |
| Script | Platform | **windows** | Execute script only when building package for Windows. It's equal to building package on Windows. |
| Script | Platform | **linux** | Execute script only when building package for Linux. It's equal to building package on Linux. |
| Script | Platform | **mac** | Execute script only when building package for Mac. It's equal to building package on Mac. |
| Script | CPU | **x86** | Execute script only when building package for x86 architecture. Often confused with the architecture on which the script is running. |
| Script | CPU | **x64** | Execute script only when building package for x64 architecture. Often confused with the architecture on which the script is running. |

**Examples:**

```
# Incorrect usage, cannot use static and dynamic linking type at once:
^3.5:static,dynamic

# Script will be called on Windows and Linux, but never on Mac:
after-build:windows,linux

# Script will be called on Linux and Mac for x86 builds:
before-build:linux,mac,x86

# Same as above but in different order: `(linux or mac) and x86`
before-build:linux,x86,mac
```