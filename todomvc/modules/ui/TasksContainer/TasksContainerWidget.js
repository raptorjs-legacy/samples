'use strict';

define.Class(
    'ui/TasksContainer/TasksContainerWidget',
    ['raptor', 'raptor/pubsub'],
    function(raptor, pubsub, require) {

        var componentRenderer = require('raptor/renderer'),
            store = require('store/TodoStore').getInstance(),
            todoTask = require('ui/Task/TaskWidget'),
            tasks = {},
            forEachEntry = raptor.forEachEntry;

        return {
            init: function(){
                var self = this;
                self.$mainContainer = $(self.getEl());
                self.$tasksList = $(this.getEl('todo-list'));

                pubsub.subscribe('todomvc/add-new-task', self.addNewTask, self);
                pubsub.subscribe('todomvc/task-toggled', self.refresh, self);
                pubsub.subscribe('todomvc/task-destroyed', self.removeTask, self);
                pubsub.subscribe('todomvc/filter', self.filter, self);
                pubsub.subscribe('todomvc/footer-initialized', self.setTasksFromStore, self);
            },

            // Set the initial workspace with all the tasks from local store
            setTasksFromStore: function(){
                var self = this;
                forEachEntry(store.findAll(), function(key, model){
                    self.addNewTask({model: model});
                });
            },

            addNewTask: function(eventArgs){
                var self = this;
                
                var taskWidget = componentRenderer.render('ui/Task/TaskRenderer', {
                        task: eventArgs.task,
                        model: eventArgs.model
                    })
                    .appendTo(self.$tasksList[0])
                    .getWidget();

                
                tasks[taskWidget.model.id] = taskWidget;
                
                pubsub.publish('todomvc/task-added');
                self.refresh();
            },

            removeTask: function(obj){
                delete tasks[obj.taskId];
                this.refresh();
            },

            refresh: function(){
                var self = this, status = self.tasksStatusCount(), 
                    todo = status.todo,  completed = status.completed,
                    show = (todo + completed) > 0,
                    main = self.$mainContainer;

                if (show){
                    main.show();
                } else {
                    main.hide();
                }

                pubsub.publish('todomvc/container-refreshed', {todo: todo, completed: completed});
            },

            // return of  count of todo and coompleted tasks
            tasksStatusCount: function(){
                var todo = 0, completed = 0;

                forEachEntry(tasks, function(id, task){
                    if (task.hasCompleted()) completed++;
                    else todo++;    
                });
                
                return {todo: todo, completed: completed};
            },

            /*
            * Filter the tasks for the selected view 
            * view = obj.view - "comompeted", "active" or "all"
            */
            filter: function(obj){
                var view = obj.view;

                forEachEntry(tasks, function(id, task){
                    var completed = task.hasCompleted();
                    switch(view){
                        case 'completed':
                            task.display(completed);
                            break;
                        case 'active':
                            task.display(!completed);
                            break;
                        case 'all':
                        case 'default':
                            task.display(true);
                            break;
                    }

                }, this);
            }
            
        }
    }
);