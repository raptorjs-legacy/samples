define(
    "module-b",
    function(require) {
        return {
            sayHello: function() {
                document.write('<p class="module-b">Hello from "module-b"!</p>');
            }
        };
    });