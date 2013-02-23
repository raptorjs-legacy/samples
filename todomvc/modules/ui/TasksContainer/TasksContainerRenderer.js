'use strict';

define(
    "ui/TasksContainer/TasksContainerRenderer",
    ['raptor/templating'],
    function(templating, require) {

        return {
            render: function(input, context) {
                templating.render(
                    'ui/TasksContainer',
                    {},
                    context);
            }
        };
    }
);