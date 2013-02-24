define(
    "ui/CreateTask/CreateTaskRenderer",
    function(require) {
        var templating = require('raptor/templating');

        return {
            render: function(input, context) {
                templating.render(
                    'ui/CreateTask',
                    {},
                    context);
            }
        };
    }
);