var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var Routes = require('./router/get.js');

// app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

Routes(app, fs)

app.listen(3000, function(){
    console.log('express hello world')
})