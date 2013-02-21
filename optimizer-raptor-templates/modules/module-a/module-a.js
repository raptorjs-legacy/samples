define(
    "module-a",
    function(require) {
        return {
            sayHello: function() {
                document.write('<p>Hello from "module-a"!</p>');
            }
        };
    });