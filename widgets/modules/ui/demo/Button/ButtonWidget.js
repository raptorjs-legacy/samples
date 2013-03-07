define(
    "ui/demo/Button/ButtonWidget",
    ['raptor'],
    function(raptor, require) {
        var ButtonWidget = function(config) {
            
            this.$().click(function() {
                this.publish('click', {
                    button: this
                });
            }.bind(this));
        };
        
        ButtonWidget.events = ["click"];
        
        
        ButtonWidget.prototype = {
        };
        
        return ButtonWidget;
    });