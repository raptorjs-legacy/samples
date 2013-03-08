define.Class(
    "ui/search/SearchForm/SearchFormWidget",
    function(require, exports, module) {
        var pubsub = require('raptor/pubsub'),
            ebayFinding = require('ebay-api/finding'),
            logger = module.logger();

        return {
            init: function(widgetConfig) {

                $(this.getEl()).submit(function() {
                    try
                    {
                        this._handleSubmit();    
                    }
                    catch(e) {
                        logger.error(e);
                    }
                    return false;
                }.bind(this));

                // NOTE: The following are equivalent:
                // $(this.getEl())
                // this.$()

            },

            _handleSubmit: function() {
                
                // Use the "ebay-api/finding" API to perform the search
                // and get back a [jQuery] promise
                var promise = ebayFinding.performSearch({
                        keywords: this.getKeywords(),
                        categoryId: parseInt(this.getCategoryId())
                    });

                // If the search was asynchronous (not cached)
                // then publish a "searchBegin" message
                // to trigger a loading indicator:
                var isAsync = promise.state() === 'pending';
                if (isAsync) {
                    pubsub.publish("searchBegin");
                }
                
                promise
                    .done(function(data) {
                        // When the search results come back 
                        // publish a "searchResults" message
                        // so that some other widget
                        // on the page can display the search
                        // results:
                        pubsub.publish("searchResults", {
                            data: data // Pass along the data as part of the message
                        });

                        // Hide the wait indicator by publishing a "searchEnd" message
                        pubsub.publish("searchEnd");
                    })
                    .fail(function(request, status, errorThrown) {
                        logger.error('ERROR: ', errorThrown);  
                    })
                    .always(function() {
                        // Make sure we always hide the wait indicator:
                        if (isAsync) { // Only publish a "searchEnd" if we published a "searchBegin"
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