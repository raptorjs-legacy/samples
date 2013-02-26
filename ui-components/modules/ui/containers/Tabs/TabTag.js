define(
    'ui/containers/Tabs/TabTag',
    function(require) {
        
        return {
            render: function(input, context) {
                 // The following code registers a nested
                 // <app:tag> with its containing <app:tabs> tag
                 // when the nested <app:tag> is rendered
                 input._tabs.addTab(input);
            }
        };
    });