define(
    "ui/search/SearchResultsContainer/SearchResultsContainerRenderer",
    function(require) {
        var templating = require('raptor/templating'),
            File = require('raptor/files/File'),
            sampleSearchResultItems = JSON.parse(new File(__dirname, "sample-data.json").readAsString()).items;


        return {
            render: function(input, context) {
                templating.render('ui/search/SearchResultsContainer', {
                    searchResultItems: sampleSearchResultItems
                }, context);
            }
        };
    });