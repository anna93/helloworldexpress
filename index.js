var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/home', function (req, res) {
    res.render('home.ejs',{
        title: 'Home Page',
        pageDescription: 'Simple Page for displaying'
    });
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
