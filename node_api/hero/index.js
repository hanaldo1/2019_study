var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

// DB connect
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.NODE_MONGO);

var db = mongoose.connection;
db.once("open", function(){
    console.log("DB CONNECTED");
});
db.on("error", function(err){
    console.log("DB ERORR : "+err);
});

// other setting
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
});

app.use("/api/heroes", require('./api/heroes'));

// Port setting
var port = 3000;
app.listen(3000, function(){
    console.log("server on! http://localhost:"+port);
});