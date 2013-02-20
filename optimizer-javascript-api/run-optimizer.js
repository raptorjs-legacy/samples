require('raptor');

require('raptor/logging').configure({
    loggers: {
        'ROOT': {level: 'WARN'},
        'optimizer': {level: 'INFO'}
    }
});

var files = require('raptor/files');

if (files.exists('static')) {
    files.remove('static');    
}

require('raptor/resources').addSearchPathDir(require('path').join(__dirname, 'modules'));

var optimizedPage = require('raptor/optimizer').optimizePage({
    name: 'test-page',
    packageFile: require('path').join(__dirname, 'pages/test-page/package.json')
});

console.log(require('raptor/debug').prettyPrint(optimizedPage));