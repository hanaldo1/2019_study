var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var FileStore = require('session-file-store')(session);

var app = express()
 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))
 
app.use(function (req, res, next) {
  if (req.session.num === undefined) {
    req.session.num = 1;
  }
  else { req.session.num += 1; }
 
  next()
})
 
app.get('/', function (req, res, next) {
  res.send(`you viewed this page ${req.session.num}`);
})

app.listen(3000, function(){
    console.log('express hello world')
})