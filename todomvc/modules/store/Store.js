
'use strict';

define.Class(
    'store/Store', 
    function(){
    
        function DataStore(name){
            var self = this;

            self.name = name;
            var store = localStorage.getItem(self.name);
            self.data = (store && JSON.parse(store)) || {};

        };

        DataStore.prototype = {
            save: function(){
                var self = this;
                localStorage.setItem(self.name, JSON.stringify(self.data));
            },

            create: function(model){
                var self = this;
                if (!model.id){
                    model.id = Date.now();
                }
                self.data[model.id] = model;
                self.save();
                return model;
            },

            update: function(model){
                var self = this;

                if (!self.data[model.id]){
                    //model doesn't exist, can't update, craete new model
                    return self.create(model);
                }

                self.data[model.id] = model;
                self.save();
                return model;
            },

            findById: function(id){
                return this.data[id];
            },

            findAll: function(){
                return this.data;
            },

            remove: function(model){
                var self = this;
                delete self.data[model.id];
                self.save();
                return null;
            }
        }

            
        return DataStore;
    }
);