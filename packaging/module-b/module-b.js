define(
    "module-b",
    function(require) {
        return {
            getMessage: function() {
                return 'Hello from "module-b"!';
            }
        };
    });