define(
    "ui/demo/ComponentsDemo/ComponentsDemoWidget",
    function(require) {
        var pubsub = require('raptor/pubsub'),
            templating = require('raptor/templating'),
            componentRenderer = require('raptor/component-renderer');

        var ComponentsDemoWidget = function(config) {
            var _this = this;

            var buttonRenderCount = 0,
                tabsRenderCount = 0;

            pubsub.subscribe({
                'sayHello': function(eventArgs) {
                    var message = eventArgs.message;
                    alert(message);
                },

                'renderNewButton': function(eventArgs) {
                    componentRenderer
                        .render('ui/buttons/Button/ButtonRenderer', {
                            variant: 'success', 
                            label: "New Button " + (++buttonRenderCount)
                        })
                        .appendTo(this.getEl('renderTarget'));
                },

                'renderNewTabs': function() {
                    componentRenderer
                        .render('ui/containers/Tabs/TabsRenderer', {
                            tabs: [
                                {
                                    title: "Tab 1",
                                    content: "Content for Tab 1"
                                },
                                {
                                    title: "Tab 2",
                                    content: "Content for Tab 2"
                                }
                            ]
                        })
                        .appendTo(this.getEl('renderTarget'));
                },

                'renderTemplate': function() {
                    componentRenderer
                        .renderTemplate("ui/demo/ComponentsDemo/test-template")
                        .appendTo(this.getEl('renderTarget'));
                },
                'renderSimpleButton': function() {
                    require('raptor/component-renderer').render(
                        'ui/buttons/SimpleButton/SimpleButtonRenderer', // The renderer
                        {                                               // The input data model
                            label: 'Simple Button'
                        })
                        .appendTo(this.getEl('renderTarget'));                       // Invoke helper method for inserting 
                                                                        // the HTML into the DOM
                }
            }, this);

            this.widgets.saveButton.on('click', function() {
                alert('You clicked the "Save" button');
            });

            this.widgets.deleteButton.on('click', function() {
                alert('You clicked the "Delete" button');
            });

            
        };
        
        ComponentsDemoWidget.prototype = {
        };
        
        return ComponentsDemoWidget;
    });