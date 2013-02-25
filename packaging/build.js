require('raptor');

require('raptor/resources').addSearchPathDir(__dirname);
require('raptor/packaging').enableExtension("test");

try
{
    require('module-a').sayHello();
    require('module-a').sayHelloTest();
}
catch(e) {
    require('raptor/logging').logger('build').error(e);
}


