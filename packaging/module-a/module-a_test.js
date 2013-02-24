define.extend(
    "module-a",
    function(require) {
        return {
            sayHelloTest: function() {
                console.log('Hello from "module-a" ("test" extension)!');
            }
        };
    });