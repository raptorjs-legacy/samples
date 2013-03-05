require('raptor');

require('raptor/logging').configure({
    loggers: {
        'ROOT': {level: 'WARN'},
        'optimizer': {level: 'INFO'}
    }
});

var files = require('raptor/files'),
    File = require('raptor/files/File'),
    optimizer = require('raptor/optimizer');

require('raptor/resources').addSearchPathDir(require('path').join(__dirname, 'modules'));

try
{
    optimizer.configure(
        files.joinPaths(__dirname, "optimizer-config.xml"), 
        {
            profile: process.argv[2] === 'dev' ? 'development' : 'production'
        });

    
    var optimizedPage = optimizer.optimizePage({
        name: 'index',
        packageFile: require('path').join(__dirname, 'pages/index/package.json'),
        basePath: __dirname + "/build"
    });

    var pageHtml = files.readAsString("pages/index/index.html");
    var outputHtml = pageHtml.replace(/<!--\s*slot: ([\w]*)\s*-->/g, function(matches, slotName) {
        return optimizedPage.getHtmlForSlot(slotName) || '';
    });

    /*
     * Write back the optimized page to disk
     */
    var outputFile = new File(__dirname + "/build/index.html");
    outputFile.writeAsString(outputHtml);
    console.log('Optimized HTML page written to disk:\n' + outputFile.getAbsolutePath());
}
catch(e) {
    require('raptor/logging').logger('build').error(e);
}


