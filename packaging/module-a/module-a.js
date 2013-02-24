define(
    "module-a",
    function(require) {
        var moduleB = require('module-b');
        
        return {
            sayHello: function() {
                console.log('Hello from "module-a"! mobule-b also says: ' + moduleB.getMessage());
            }
        };
    });