require('raptor');

// Configure the log levels for various modules
require('raptor/logging').configure({
    loggers: {
        'ROOT': {level: 'WARN'},
        'raptor/optimizer': {level: 'INFO'}
    }
});

var files = require('raptor/files'),
    File = require('raptor/files/File'),
    optimizer = require('raptor/optimizer');

// Add the "modules" directory to the resource search path
require('raptor/resources').addSearchPathDir(
    require('path').join(__dirname, 'modules'));

try
{
    // Configure the default instance of the RaptorJS Optimizer:
    optimizer.configure(
        files.joinPaths(__dirname, "optimizer-config.xml"), 
        {
            profile: process.argv[2] === 'dev' ? 'development' : 'production'
        });

    // Optimize the page to produce the optimized resource bundles:
    var optimizedPage = optimizer.optimizePage({
        name: 'index', // Used to name optimized resource bundles
        module: 'pages/index', // Use the dependencies defined in the package.json file
                               // associated with the 'pages/index' module
                               // i.e. /modules/pages/index/package.json
        basePath: __dirname + "/build", // Used to generate relative paths from the output 
                                        // page  to the optimized resource bundles for 
                                        // in-place deployment
        enabledExtensions: ['browser', 'raptor/logging/console'] // Enable package extensions
    });

    // Use information from the optimized page to update the static HTML file 
    // with the required markup:
    var pageHtml = files.readAsString("modules/pages/index/index.html");
    var outputHtml = pageHtml.replace(
        /<!--\s*slot: ([\w]*)\s*-->/g, // Use a regular expression to find slots 
                                       // in the HTML markup
        function(matches, slotName) {
            return optimizedPage.getHtmlForSlot(slotName);
        });

    // Write the resulting HTML to a new file:
    var outputFile = new File(__dirname + "/build/index.html");
    outputFile.writeAsString(outputHtml);
    console.log('Optimized HTML page written to disk:\n' + outputFile.getAbsolutePath());
}
catch(e) {
    require('raptor/logging').logger('build').error(e);
}


