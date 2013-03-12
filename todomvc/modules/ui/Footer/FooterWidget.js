define.Class(
    "ui/Footer/FooterWidget",
    ['raptor', 'raptor/pubsub'],
    function(raptor, pubsub, require) {
        'use strict';

        var componentRenderer = require('raptor/renderer'),
            forEachEntry = raptor.forEachEntry;

        return {
            init: function(){
                var self = this;

                self.$footer = this.$();
                self.$footerLinks = self.$footer.find("a");
                self.$todoCount = $(this.getEl('todo-count-num'));
                self.$completedCount  = $(this.getEl('completed-count'));
                self.$completedBtn = $(this.getEl('clear-completed'));
                
                self.$completedBtn.on('click', function(){
                    pubsub.publish('todomvc/clear-completed-tasks');
                });

                pubsub.subscribe('todomvc/container-refreshed', self.refresh, self);
                pubsub.subscribe('todomvc/filter', self.setActive, self);
                pubsub.publish('todomvc/footer-initialized');
            },

            refresh: function(data){
                var self = this, todo = data.todo, completed = data.completed,
                    show = (todo + completed) > 0;

                if (show){
                    self.$footer.show();
                } else {
                    self.$footer.hide();
                }

                self.$todoCount.html(todo);
                self.$completedCount.html(completed);

                if (completed > 0){
                    self.$completedBtn.show();
                } else {
                    self.$completedBtn.hide();
                }
            },

            setActive: function(input){
                this.$footerLinks
                    .removeClass('selected')
                    .filter( '[href="#/' + (input.view || '') + '"]' )
                    .addClass('selected');
            }
            
        }
    }
);