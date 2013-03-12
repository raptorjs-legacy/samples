'use strict';

define.Class(
    'ui/App/AppWidget', 
    ['raptor/pubsub'],
    function(pubsub, require, exports, module){

        return {
            init: function(){
                Router({
                    '/:filter': {
                        on: this.filter
                    },
                    '/': {
                        on: this.filter
                    }
                }).init();
            },

            filter: function(param){
                pubsub.publish('todomvc/filter', {view: param || 'all'});
            }
        };
    }
);
