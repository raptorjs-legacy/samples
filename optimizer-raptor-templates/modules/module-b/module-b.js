define(
    "module-b",
    function(require) {
        return {
            sayHello: function() {
                document.write('<p>Hello from "module-b"!</p>');
            }
        };
    });