define(
    "ui/demo/Button/ButtonRenderer",
    function(require) {
        return {
            render: function(input, context) {
                
                require('raptor/templating').render('ui/demo/Button', input, context);
            }
        };
    });