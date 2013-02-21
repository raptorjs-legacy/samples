define(
    "module-a",
    function(require) {
        return {
            sayHello: function() {
                document.write('<p class="module-a">Hello from "module-a"!</p>');
            }
        };
    });