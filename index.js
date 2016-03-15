var express = require('express');
var engine = require('ejs-locals');
var app=express();
var path    = require("path");
var redis = require('redis');
var client = redis.createClient();

app.engine('ejs',engine);

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.json({msg: 'Our HomePage'});
});

app.get('/validateLogin', function (req,res) {
    var emailIdEnteredByUSer=req.query.emailId;
    var passwordEnteredByUser=req.query.password;
    client.sismember("userList",emailIdEnteredByUSer,function(err,reply){
        if(reply==0) {
            return res.json({'loginStatus': 0,'msg':' Email id isn\'t registered with us'});
        }
        else{
            client.get(emailIdEnteredByUSer+":password", function (err,reply) {
               if(reply==passwordEnteredByUser){
                   return res.json({'loginStatus': 1});
               }
                else{
                   return res.json({'loginStatus': 0,'msg':' Wrong password entered please check your password'});
               }
            });

        }
    });
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
