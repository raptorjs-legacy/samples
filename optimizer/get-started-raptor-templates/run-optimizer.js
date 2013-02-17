require('raptor');

require('raptor/logging').configure({
    loggers: {
        'ROOT': {level: 'WARN'},
        'optimizer': {level: 'INFO'}
    }
});

var files = require('raptor/files'),
    templating = require('raptor/templating'),
    resources = require('raptor/resources');

//Cleanup from previous runs: Remove the output directory for optimized resource bundles
if (files.exists('static')) {
    files.remove('static');    
}

//Add the modules directory to the resource search path so that the modules can be found
resources.addSearchPathDir(__dirname);
resources.addSearchPathDir(require('path').join(__dirname, 'modules'));

var outputHtml = templating.renderToString("/pages/test-page/test-page.rhtml");
var pageHtmlPath = "test-page.html";

console.log('Writing optimized page HTML to "' + pageHtmlPath + '"...');
files.writeAsString(pageHtmlPath, outputHtml);