var express = require('express');
var bodyParser = require("body-parser"); 
var app = express();
var books = require('./books-test-collection');
var dataHandler = require('./datahandler');
var filter;

dataHandler.init(books);

app.use(bodyParser.urlencoded({ extended: false }));  

/**
 * testing method
 */
app.route('/allbooks').post(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(books);
    console.log('changed');
});

/**
 * get book page data;
 * page: {
 *   totalPages: 10,
 *   pageSize: 10,
 *   pageNo: 4,
 *   books: [
 *      {...},
 *      {...},
 *      ...
 *   ]
 * }
 */
app.route('/page').post(function(req, res) {
    var p = req.body;
    p = p || {};
    p.pageSize = p.pageSize || 10;
    p.page = p.page || 1;

    if (typeof(p.page) !== 'number') p.page = parseInt(p.page);
    if (typeof(p.pageSize) !== 'number') p.pageSize = parseInt(p.pageSize);

    res.header("Access-Control-Allow-Origin", "*");
    res.json(dataHandler.getPageJson(p.page, p.pageSize, p.keyword));
});

app.route('/search').post(function(req, res) {
    var p = req.body;
    p = p || {};
    p.pageSize = p.pageSize || 10;
    p.page = p.page || 1;
    p.keyword = p.keyword || '';
    res.header("Access-Control-Allow-Origin", "*");
    res.json(dataHandler.searchBooks(p.keyword, p.page, p.pageSize));    
});

app.get('/', function(req, res) {
    res.send('Hello World!');
});

var server=app.listen(4000,function() {
    console.log('server listening at port 4000 now.');
});