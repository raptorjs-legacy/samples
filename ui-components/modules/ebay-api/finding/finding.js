define('ebay-api/finding', function(require) {
    var baseUrl = "http://localhost:3000/ebay/finding";

    

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

            var deferred = new $.Deferred();

            $.getJSON(url).then(
                    function(data) {
                        deferred.resolve(data[0]);
                    },
                    function(request, status, errorThrown) {
                        deferred.reject(arguments);
                    });

            return deferred.promise();
        },

        _performServiceCall: function(url) {

        }
    }
});