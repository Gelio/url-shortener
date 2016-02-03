# Url shortener #

This is a basic url shortener developed in Node using MongoDB as a storage.

## How it works ##

Current API options:

* */shorten/<url>* - shortens URL and returns JSON that contains the id and the base url. If it's already been shortened in the past then it returns the previous record from the database. ID is a 24 character hex string.
* */url/<id>* - redirects to a URL associated with that ID. If no URL was found then displays an error JSON object.

When no API options are matched then the server sends static files from the *public* directory. *index.html* contains basic information about the service.

## Configuration ##

Upon launch you can specify a port that the server should bind to as a first parameter.

The server maintains a connection to a mongodb database that's by default on localhost's port 27017 (can be easily changed in the `url` variable.
The database that it uses is *url-shortener*.


This application was created by Grzegorz Rozdzialik.