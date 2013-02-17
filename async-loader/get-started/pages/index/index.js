window.TestPage = {
    loadModuleBAsync: function() {
        require('module-b', function(moduleB) {
            moduleB.sayHello();
        });
    }
}