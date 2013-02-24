RaptorJS Sample: Packaging
==============================

This sample how packages are used on the server to load modules, as well as how packages are
used by the RaptorJS Optimizer.

To view the full documentation for this sample please see [RaptorJS: Packaging](http://raptorjs.org/packaging/get-started/).

## Run Sample

### Build Steps

#### Server-side Module Loading
1. npm install
2. node build.js

#### Client-side Packaging
1. npm install raptor --global
2. raptor-optimizer module-a module-b --name build-test --out build --extensions test
3. raptor-optimizer module-a module-b --name build --out build