define(
    "ui/demo/ColorChangeButton/ColorChangeButtonRenderer",
    ['raptor'],
    function(raptor, require) {
        return {
            render: function(input, context) {
                var colors = input.colors;
                if (typeof colors === 'string') {
                    colors = colors.split(/\s*,\s*/);
                }
                
                require('raptor/templating').render('ui/demo/ColorChangeButton', {
                    label: input.label,
                    widgetConfig: {
                        colors: colors
                    } 
                }, context);
            }
        };
    });