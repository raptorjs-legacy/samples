'use strict';

define.Class(
    "ui/CreateTask/CreateTaskWidget",
    ['raptor', 'raptor/pubsub'],
    function(raptor, pubsub, require) {

        var ENTER_KEY = 13,
            componentRenderer = require('raptor/component-renderer'),
            forEachEntry = raptor.forEachEntry,
            newTodo = $('#new-todo'),
            taskList = $('#todo-list');

        return {
            init: function(){
                var self = this;
                newTodo.on('keypress', $.proxy(self.onKeyPress, self));
                pubsub.subscribe('TaskContainer/taskAdded', $.proxy(self.onTaskAdded, self));
            },

            onKeyPress: function(ev){
                if ( ev.which === ENTER_KEY ) {
                    pubsub.publish('CreateTask/newTaskAdded', {task: newTodo.val()});
                }
            },

            onTaskAdded: function(){
                newTodo.val("");
            }
        }
    }
);