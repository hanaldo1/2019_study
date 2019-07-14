var express = require('express')
var app = express()
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var session = require('express-session')
var FileStore = require('session-file-store')(session);

var indexRoutes = require('./routes/index.js');
var topicRoutes = require('./routes/routes.js');
var authRoutes = require('./routes/auth.js');

// middleware
app.use(bodyParser.urlencoded({extended : false}))
// app.post의 request 객체에 파싱한 body 프로퍼티를 만들어줌
app.use(compression())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))

app.get('*', function(request, response, next){
    fs.readdir('./data/', function(err, files){
        request.list = files;
        next();
    })
})

app.use(express.static('public'));
app.use('/', indexRoutes);
app.use('/topic', topicRoutes);
app.use('/auth', authRoutes);

// 404 handler
app.use(function(request, response, next){
    throw new Error(request.url+' not found')
})
app.use(function(err, request, response, next){
    console.error(err.stack)
    response.status(500).send('Something broke!')
})

app.listen(3000, function(){
    console.log('express hello world')
})