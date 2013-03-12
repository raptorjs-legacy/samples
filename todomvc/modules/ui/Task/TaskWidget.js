'use strict';

define.Class(
    "ui/Task/TaskWidget",
    ['raptor', 'raptor/pubsub'],
    function(raptor, pubsub, require) {

        var ENTER_KEY = 13,
            store = require('store/TodoStore').getInstance();

        return {
            model: {},

            init: function(widgetConfig){
                var self = this, c = widgetConfig,
                    list = self.list = self.$();;

                self.model = c.model;

                self.editElem = $('input.edit', list);
                self.taskLabel = $('[data-title]', list);

                list.on('click', 'input.toggle', self.toggle.bind(self));
                list.on('dblclick', '[data-title]', self.edit.bind(self));
                list.on('keypress', 'input.edit', self.update.bind(self));
                list.on('click', '[data-destroy]', self.destroy.bind(self));

                pubsub.subscribe('todomvc/clear-completed-tasks', self.clearCompleted, self);
            },

            /** on click of checkbox, toggle completed/not done**/
            toggle: function(){
                var self = this;
                self.list.toggleClass('completed');
                self.model = store.update({id: self.model.id, title: self.model.title, completed: self.list.hasClass('completed')});
                pubsub.publish('todomvc/task-toggled');
            },

            /** Edit the current task **/
            edit: function(){
                var self = this;
                self.list.addClass('editing');
                return self.editElem.focus();
            },

            /** update the task with new value **/
            update: function(ev){
                if (ev.which === ENTER_KEY){
                    var self = this, newTitle = self.editElem.val();
                    self.taskLabel.html(newTitle);
                    self.list.removeClass('editing');
                    self.model = store.update({id: self.model.id, title: newTitle, completed: self.list.hasClass('completed')});
                }
            },

            /** remove the task on click of close button */
            destroy: function(){
                var self = this, taskId = self.model.id;
                self.model = store.remove(self.model);
                self.list.remove();
                pubsub.publish('todomvc/task-destroyed', {taskId: taskId});
            },

            clearCompleted: function(){
                var self = this;
                if (self.hasCompleted()){
                    self.destroy();
                }
            },

            hasCompleted: function(){
                var self = this;
                return self.model && self.model.completed;
            },

            display: function(visible){
                var self = this;
                visible ? self.list.show() : self.list.hide();
            }            
        }
    }
);