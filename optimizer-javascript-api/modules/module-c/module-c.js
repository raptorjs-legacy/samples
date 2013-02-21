define(
    "module-c",
    function(require) {
        return {
            sayHello: function() {
                document.write('<p class="module-c">Hello from "module-c"!</p>');
            }
        };
    });