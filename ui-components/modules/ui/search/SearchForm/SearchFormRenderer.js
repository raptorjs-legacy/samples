define(
    "ui/search/SearchForm/SearchFormRenderer",
    function(require) {
        var templating = require('raptor/templating');

        return {
            render: function(input, context) {
                templating.render(
                    'ui/search/SearchForm',
                    {},
                    context);
            }
        };
    });