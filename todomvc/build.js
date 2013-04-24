require('raptor');

var templating = require('raptor/templating'),
    files = require('raptor/files'),
    resources = require('raptor/resources');

require('raptor/optimizer').configure(
    files.joinPaths(__dirname, "optimizer-config.xml"), 
    {
        profile: process.argv[2] === 'dev' ? 'development' : 'production'
    });

resources.addSearchPathDir(__dirname);
resources.addSearchPathDir(files.joinPaths(__dirname, 'modules'));

var pageOutputPath = files.joinPaths(__dirname, 'build/index.html');

function onError(e) {
    require('raptor/logging').logger('build').error(e);
}

try
{
    templating.renderToFile("/pages/index/index.rhtml", pageOutputPath)
        .then(
            function() {
                console.log('Published page: ' + pageOutputPath);
            },
            onError);
}
catch(e) {
    onError(e);
}


