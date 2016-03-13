var express = require('express');
var engine = require('ejs-locals');
var app=express();
var path    = require("path");


app.engine('ejs',engine);

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.json({msg: 'Our HomePage'});
});

app.get('/home', function (req, res) {
    res.render('home',{
        title: 'Home Page',
        pageDescription: 'Simple Page for displaying'
    });
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
