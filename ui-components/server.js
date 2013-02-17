var express = require('express');
var app = express();
//
//app.get('/', function(req, res){
//    res.send('Hello World');
//});
app.use(express.static(__dirname))


app.listen(8090);
console.log('Listening on port 8090');
