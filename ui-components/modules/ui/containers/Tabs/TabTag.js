define(
    'ui/containers/Tabs/TabTag',
    function(require) {
        
        return {
            render: function(input, context) {
                 input._tabs.addTab(input);
            }
        };
    });