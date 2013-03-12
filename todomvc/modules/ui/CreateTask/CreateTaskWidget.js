'use strict';

define.Class(
    "ui/CreateTask/CreateTaskWidget",
    ['raptor', 'raptor/pubsub'],
    function(raptor, pubsub, require) {

        var ENTER_KEY = 13,
            componentRenderer = require('raptor/renderer'),
            forEachEntry = raptor.forEachEntry;

        return {
            init: function(){
                var self = this;
                self.$newTodo = $(this.getEl('new-todo'));
                self.$newTodo.on('keypress', self.onKeyPress.bind(self));
                pubsub.subscribe('todomvc/task-added',  self.onTaskAdded.bind(self));
            },

            onKeyPress: function(ev){
                if ( ev.which === ENTER_KEY ) {
                    pubsub.publish('todomvc/add-new-task', {task: this.$newTodo.val()});
                }
            },

            onTaskAdded: function(){
                this.$newTodo.val("");
            }
        }
    }
);