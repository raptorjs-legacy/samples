
'use strict';

define(
    'store/TodoStore', 
    function(require, exports, module){

        var STORE_KEY = 'raptorjs-todo',
            dataStore = require('store/Store'),
            instance = null;

        return {
            getInstance: function(){
                if (instance == null){
                    instance = new dataStore(STORE_KEY);
                }

                return instance;
            }
        };
    }
);