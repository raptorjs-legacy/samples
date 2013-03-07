define(
    "SimpleWidget",
    function(require) {

        var SimpleWidget = function(widgetConfig) {

            // Get a reference to the root DOM node:
            var rootEl = this.getEl(); 

            // Wrap the DOM node as a jQuery object:
            var $rootEl = $(rootEl);

            // Use jQuery to add DOM click listener
            $rootEl.click(function() {

                // When clicked, update the background
                // color to color provided in the config:
                $rootEl.css(
                    "background-color", 
                    widgetConfig.color);
            });

        };
        
        SimpleWidget.prototype = {
        };
        
        return SimpleWidget;
    });