var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID;
    url = 'mongodb://localhost:27017/url-shortener',
    app = express(),
    port = Number(process.argv[2]) || 3000,
    dbConnection = null;

function findURL(db, searchObj, callback) {
    if(!callback)
        return console.error('No callback specified.');

    db.collection('urls').find(searchObj).limit(1).toArray(function(err, items) {
        if(err)
            return callback(err, items);

        if(items.length === 1)
            callback(null, items[0]);
        else
            callback(null, null);
    });
}

app.get('/shorten/:url', function(req, res) {
    if(req.params.url.length > 300)
        return res.end(JSON.stringify({error: 'this url is too long'}));

    findURL(dbConnection, {url: req.params.url}, function(err, result) {
        if(err)
            return res.send('An error occured');

        if(result)
            res.send(JSON.stringify(result));
        else {
            var toInsert = {url: req.params.url};

            dbConnection.collection('urls').insertOne(toInsert).then(function(result) {
                res.send(JSON.stringify(result.ops[0]));
            }, function(error) {
                console.error('Error while adding the url', error);
                res.send(JSON.stringify({error: 'cannot shorten the url'}));
            });

        }
    })
});

app.get('/url/:id', function(req, res) {
    findURL(dbConnection, {_id: new ObjectID(req.params.id)}, function(err, result){
        if(err)
            return res.send('An error occured');

        if(result)
            res.send(JSON.stringify(result));
        else
            res.send(JSON.stringify({error: 'this id cannot be found in our database'}));
    });
});

app.use('/', express.static(__dirname + '/public'));

MongoClient.connect(url, function(err, db) {
    if(err)
        return console.error('Cannot connec to the database.', url);

    dbConnection = db;

    app.listen(port, function() {
        console.log('Server running on port ' + port);
    });
});