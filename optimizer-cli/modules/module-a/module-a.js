define(
    "module-a",
    function(require) {
        return {
            sayHello: function() {
                alert('Hello from "module-a"!');
            }
        };
    });