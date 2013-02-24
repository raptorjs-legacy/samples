'use strict';

define(
    "ui/Task/TaskRenderer",
    ['raptor/templating'],
    function(templating, require) {

        var store = require('store/TodoStore').getInstance();

        return {
            render: function(input, context) {

                var model = input.model || store.create({title: input.task, completed: false});

                templating.render(
                    'ui/Task',
                    {
                        rowId: model.id, 
                        title: model.title, 
                        checked: model.completed,
                        widgetConfig: {model: model}
                    },
                    context);
            }
        };
    }
);