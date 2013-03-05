require('raptor');
require('raptor/logging').configure({
    loggers: {
        'ROOT': {level: 'WARN'},
        "raptor/optimizer": {level: "INFO"},
        "raptor/optimizer/cli": {level: "INFO"}
    }
});

var files = require('raptor/files')
    File = require('raptor/files/File'),
    templating = require('raptor/templating'),
    resources = require('raptor/resources'),
    optimizer = require('raptor/optimizer'),
    logger = require('raptor/logging').logger('build'),
    outputFile = new File(__dirname + "/build/index.html");


optimizer.configure(
    files.joinPaths(__dirname, "optimizer-config.xml"), 
    {
        profile: process.argv[2] === 'dev' ? 
            'development' : 
            'production'
    });

// Add the modules directory to the resource search 
// path so that the modules can be found
resources.addSearchPathDir(files.joinPaths(__dirname, 'modules'));

try
{
    templating.renderToFile("/pages/index/index.rhtml", outputFile);

    console.log('Optimized HTML page written to disk:\n' + 
        outputFile.getAbsolutePath());
}
catch(e) {
    logger.error(e);
}

