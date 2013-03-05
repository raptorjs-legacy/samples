(function() {
    var logging = require('raptor/logging');
    logging.configure({
        loggers: {
            'ROOT': {level: "DEBUG"}
        }
    });
    
    logging.logger('index').debug("Hello!");
}());