define(
    "module-a",
    function(require) {
        return {
            hello: function() {
                return 'Hello from "module-a"!';
            }
        };
    });