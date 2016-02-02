var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/url-shortener',
    app = express(),
    port = Number(process.argv[2]) || 3000;

app.get('/shorten/:url', function(req, res) {
    // req.params.url
    res.end('Shortened');
    /* Connect to the database, check if it's already been shortened
        1. If yes - return that data
        2. If no - add it to the collection and return
     */
});

app.get('/url/:id', function(req, res) {
    // req.params.id
    /*
        Connect to the database, check if such id was already shortened
        then respond with proper data
     */
});

// If none of the above match then server static files from the public directory
app.use('/', express.static(__dirname + '/public'));

app.listen(port, function() {
    console.log('Server running on port ' + port);
});