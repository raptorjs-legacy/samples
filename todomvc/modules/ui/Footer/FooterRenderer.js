'use strict';

define(
    "ui/Footer/FooterRenderer",
    ['raptor/templating'],
    function(templating, require) {

        return {
            render: function(input, context) {
                templating.render(
                    'ui/Footer',
                    {},
                    context);
            }
        };
    }
);