var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan');

var app = express();

app.set('views', path.resolve(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('short'));

app.use('/css', express.static('css'));

app.get('/', function (req, res){
    res.render('index', {
        title: "Employee Records Application"
    });
});

http.createServer(app).listen(8080, function(){
    console.log(`app started on port 8080`);
})