define(
    "module-b",
    function(require) {
        return {
            hello: function() {
                return 'Hello from "module-b"!';
            }
        };
    });