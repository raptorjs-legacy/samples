define.Class(
    "ui/search/SearchForm/SearchFormWidget",
    function(require) {
        var pubsub = require('raptor/pubsub'),
            ebayFinding = require('ebay-api/finding');

        return {
            init: function(widgetConfig) {
                var _this = this;

                this.$().submit(function() {
                    try
                    {
                        _this._handleSubmit();    
                    }
                    catch(e) {
                        console.error(e);
                    }
                    return false;
                });

            },

            _handleSubmit: function() {
                
                
                var promise = ebayFinding.performSearch({
                        keywords: this.getKeywords(),
                        categoryId: parseInt(this.getCategoryId())
                    });

                var async = promise.state() === 'pending';
                if (async) {
                    pubsub.publish("searchBegin");
                }
                
                promise
                    .done(function(data) {
                        pubsub.publish("searchResults", {
                            data: data
                        });
                        pubsub.publish("searchEnd");
                    })
                    .fail(function(request, status, errorThrown) {
                        console.error('ERROR: ', errorThrown);  
                    })
                    .always(function() {
                        if (async) {
                            pubsub.publish("searchEnd");    
                        }
                    });
            },

            getKeywords: function() {
                return document.getElementById("search-form-keywords").value;
            },

            getCategoryId: function() {
                return $('#search-form-cat').val();
            }
        };
    });