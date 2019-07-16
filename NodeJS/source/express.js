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

var authData = {
    email:'aaa@email.com',
    password:'1111',
    nickname: 'aaa'
}

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function(username, password, done){
        console.log('LocalStrategy', username, password);
        if(username === authData.email ){
            console.log(1)
            if(password === authData.password){
                console.log(2)
                return done(null, authData)
            }
            else{
                console.log(3)
                return done(null, false, {
                    message: "Incorrect username"
                });
            }
        }
        else{
            console.log(4)
            return done(null, false, {
                message: "Incorrect username"
            });
        }
    }
));

app.post('/auth/login_process', 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login'
    }));

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