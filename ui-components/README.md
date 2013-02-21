RaptorJS Sample: UI Components
==============================

This guide will describe a recipe for building UI components that are 
independently testable and can be rendered on the server or in the browser.

For this guide, the following technologies will be used:
* [jQuery](http://jquery.com/): Client-side DOM management and DOM event handling
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/): Underlying UI component implementations
* [RaptorJS Widget Framework](http://raptorjs.org/widgets/): Client-side widget initialization and widget communication
* [Raptor Templates](http://raptorjs.org/raptor-templates/): HTML templating language for rendering UI component views
* [RaptorJS Packaging](http://raptorjs.org/packaging/): Declaring UI component dependencies
* [RaptorJS Optimizer](http://raptorjs.org/optimizer/): Delivering JavaScript and CSS code to the browser
* [RaptorJS AMD](http://raptorjs.org/modules-classes/): Modules, classes and mixins

[View Live Demo](http://raptorjs.org/demos/ui-components/)

To view the full documentation for this sample please visit [RaptorJS: Building UI Components](http://raptorjs.org/ui-components/).

## Run Sample

### Build Steps
1. npm install
2. node build.js

### Build Output
After running the above steps an output HTML file will be written to "build/index.html". 
This generated HTML file can be loaded in your web browser to view the working demo.
