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
                    list = self.list = $(self.getEl());

                self.model = c.model;

                self.editElem = $('input.edit', list);
                self.taskLabel = $('[data-title]', list);

                list.on('click', 'input.toggle', $.proxy(self.toggle, self));
                list.on('dblclick', '[data-title]', $.proxy(self.edit, self));
                list.on('keypress', 'input.edit', $.proxy(self.update, self));
                list.on('click', '[data-destroy]', $.proxy(self.destroy, self));

                pubsub.subscribe('Footer/clearCompletedTasks', self.clearCompleted, self);
            },

            /** on click of checkbox, toggle completed/not done**/
            toggle: function(){
                var self = this;
                self.list.toggleClass('completed');
                self.model = store.update({id: self.model.id, title: self.model.title, completed: self.list.hasClass('completed')});
                pubsub.publish('Task/toggled');
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
                pubsub.publish('Task/destroyed', {taskId: taskId});
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