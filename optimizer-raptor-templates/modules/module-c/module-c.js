define(
    "module-c",
    function(require) {
        return {
            sayHello: function() {
                document.write('<p>Hello from "module-c"!</p>');
            }
        };
    });