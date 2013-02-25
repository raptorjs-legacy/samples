define('ebay-api/finding', function(require) {
    var baseUrl = "http://raptorjs-samples-api.herokuapp.com/ebay/finding";

    

    return {
        
        performSearch: function(searchArgs) {
            var keywords = searchArgs.keywords,
                categoryId = searchArgs.categoryId,
                url = baseUrl;

            // Build the URL...
            // 
            /*
             * Sample URLs:
             * /ebay/finding/category/625/keywords/canon
             * /ebay/finding/keywords/playstation
             * /ebay/finding/category/625
             */
            if (categoryId) {
                url += '/category/' + encodeURIComponent(categoryId);
            }

            if (keywords) {
                url += '/keywords/' + encodeURIComponent(keywords);
            }

            url += '?callback=?'
            
            return $.getJSON(url);
        },

        _performServiceCall: function(url) {

        }
    }
});