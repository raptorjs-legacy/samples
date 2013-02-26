'use strict';

define.Class(
    "ui/Footer/FooterWidget",
    ['raptor', 'raptor/pubsub'],
    function(raptor, pubsub, require) {

        var componentRenderer = require('raptor/component-renderer'),
            forEachEntry = raptor.forEachEntry,
            footer = $('#footer'),
            footerLinks = $('#filters a'),
            todoCount = $('#todo-count-num'),
            completedCount = $('#completed-count'),
            completedBtn = $('#clear-completed');

        return {
            init: function(){
                var self = this;
                
                completedBtn.on('click', function(){
                    pubsub.publish('Footer/clearCompletedTasks');
                });

                pubsub.subscribe('TaskContainer/containerRefreshed', self.refresh, self);
                pubsub.subscribe('AppWidget/filter', self.setActive, self);
                pubsub.publish('Footer/initialized');
            },

            refresh: function(data){
                var todo = data.todo, completed = data.completed,
                    show = (todo + completed) > 0;

                if (show){
                    footer.show();
                } else {
                    footer.hide();
                }

                todoCount.html(todo);
                completedCount.html(completed);

                if (completed > 0){
                    completedBtn.show();
                } else {
                    completedBtn.hide();
                }
            },

            setActive: function(){
                footerLinks
                    .removeClass('selected')
                    .filter( '[href="#/' + (param || '') + '"]' )
                    .addClass('selected');
            }
            
        }
    }
);