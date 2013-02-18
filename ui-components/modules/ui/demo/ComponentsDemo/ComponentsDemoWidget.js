define(
    "ui/demo/ComponentsDemo/ComponentsDemoWidget",
    function(require) {
        var pubsub = require('raptor/pubsub'),
            componentRenderer = require('raptor/component-renderer');

        var ButtonWidget = function(config) {
            var _this = this;
            
            
            
            this.toggled = false;
            this.$button = this.$();
            this._toggle = config.toggle;
            
            if (config.toggled) {
                this.toggle();
            }
            
            
            this.$().click(function() {
                _this.publish('click', {
                    button: this
                });
                
                if (_this._toggle) {
                    _this.toggle();
                }
            });

            var renderCount = 0;

            pubsub.subscribe({
                'sayHello': function(eventArgs) {
                    var message = eventArgs.message;
                    alert(message);
                },

                'renderNewButton': function(eventArgs) {
                    componentRenderer
                        .render('ui/buttons/Button/ButtonRenderer', {variant: 'success', label: "New Button " + (++renderCount)})
                        .appendTo(this.getEl('renderTarget'));
                }
            }, this);

            this.deleteButton.on('click', function() {
                alert('You clicked the "Delete" button');
            })
        };
        
        ButtonWidget.events = ["click", "toggle"];
        
        
        ButtonWidget.prototype = {
            toggle: function() {
                this.toggled = !this.toggled;
                this.$button.button('toggle');
                this.publish('toggle', {
                    button: this
                });
            }
        };
        
        return ButtonWidget;
    });