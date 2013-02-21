require('raptor');

require('raptor/logging').configure({
    loggers: {
        'ROOT': {level: 'WARN'},
        "raptor/optimizer": {level: "INFO"},
        "raptor/optimizer/cli": {level: "INFO"}
    }
});

var files = require('raptor/files'),
    templating = require('raptor/templating'),
    resources = require('raptor/resources');

require('raptor/optimizer').configure(
    files.joinPaths(__dirname, "optimizer-config.xml"), 
    {
        profile: process.argv[2] === 'dev' ? 'development' : 'production'
    });

//Add the modules directory to the resource search path so that the modules can be found
resources.addSearchPathDir(__dirname);
resources.addSearchPathDir(require('path').join(__dirname, 'modules'));

try
{
    var outputHtml = templating.renderToString("/pages/index/index.rhtml");
    var outputFile = files.createFile(__dirname + "/build/index.html");

    outputFile.writeAsString(outputHtml);
    console.log('Optimized HTML page written to disk:\n' + outputFile.getAbsolutePath());
}
catch(e) {
    require('raptor/logging').logger('build').error(e);
}

