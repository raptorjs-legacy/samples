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

require('raptor/templating/compiler').setWorkDir(files.joinPaths(__dirname, "work"));

var pageOutputPath = files.joinPaths(__dirname, 'build/index.html');
try
{
    templating.renderToFile("/pages/index/index.rhtml", pageOutputPath, {
        name: 'John',
        count: 30
    });    
    console.log('Published page: ' + pageOutputPath);
}
catch(e) {
    require('raptor/logging').logger('build').error(e);
}


