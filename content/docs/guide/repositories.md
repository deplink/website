---
layout: docs/guide
title: Repositories
description: Repository store information about available dependencies, their versions and source code or location from which this source code can be downloaded.
menuGroup: Advanced
order: 505
---

Local repository
----------------

Local repository is designed for package development purposes. It's uses the local filesystem to represents the available organizations and packages. First level in the filesystem is the organization level (part of a package name before the `/` symbol). The second directory level is the package name (part of a package name after the `/` symbol). Example structure for 3 packages (`example/console`, `example/package` and `hello/world`) will looks as below:

```
/path/to/repo/
├── example/
│   ├── console/
│   │   ├── ...
│   │   └── deplink.json
│   └── package/
│       ├── ...
│       └── deplink.json
└── hello/
    └── world/
        ├── ...
        └── deplink.json
```

To define such repository we have to add the appropriate entry in package file:

```json
"repositories": [
    {
        "type": "local",
        "src": "/path/to/repo"
    }
]
```

The `src` property can be either absolute path or path relative to the `deplink.json` file in which we've added the repository.

Installing packages from local repository will be equal to creating a deep copy of the package directory or creating a symlink to that directory. It's important question which method will be used, because in case of symlink you don't have to call any command to see changes from your dependencies. In case of deep copy you have to dump the [package version number](/docs/guide/package-file#version) and update dependency.

Remote repository
-----------------

Remote repository (also called *online repository*) stores information about available packages on the server. Communication with server is done using the HTTPS protocol. Example of such repository is the [Official Online Repository](https://repo.deplink.org) which is by default used as a fallback repository. To use official remote repository you don't have to add any entry to the [repositories](/docs/guide/package-file#repositories) property, it's enabled by default.

There's also a possibility to create private remote repository. Instruction how to install and use private repositories you can be find in a [special article](/docs/guide/private-repository).
