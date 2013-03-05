joconsole.log('Generating static files for RaptorJS Async Loader demo...');

require('raptor');

require('raptor/logging').configure({
    loggers: {
        'ROOT': {level: 'WARN'},
        'optimizer': {level: 'INFO'}
    }
});

var files = require('raptor/files'),
    File = require('raptor/files/File'),
    resources = require('raptor/resources'),
    templating = require('raptor/templating');

require('raptor/optimizer').configure(
    files.joinPaths(__dirname, "optimizer-config.xml"), 
    {
        profile: process.argv[2] === 'dev' ? 'development' : 'production'
    });

try
{
    var outputFile = new File(require('path').join(__dirname, 'build/index.html'));

    if (files.exists('static')) {
        files.remove('static');    
    }

    if (outputFile.exists()) {
        outputFile.remove();
    }

    resources.addSearchPathDir(__dirname);
    resources.addSearchPathDir(require('path').join(__dirname, 'modules'));

    templating.renderToFile('/pages/index/index.rhtml', outputFile, {
        outputDir: files.joinPaths(__dirname, '/build')
    });

    console.log('Published page: ' + outputFile.getAbsolutePath());
}
catch(e) {
    require('raptor/logging').logger('build.js').error(e);
}