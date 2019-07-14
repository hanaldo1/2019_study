var express = require('express');
var router = express.Router()
var template = require('../lib/module.js');
var auth = require('../lib/auth.js');

router.get('/', function(request, response){
    var title = 'welcome';
    var description = "home page"; 
    var list = template.list(request.list);
    var html = template.html(title, list, `
    <h2>${title}</h2>
    ${description}
    <img src="/images/wolf.jpg" style="width:50%;  display:block; margin-top:10px;">
    `,  '<a href="/topic/create">create</a>', auth.Status(request, response));
    
    response.send(html)
})

module.exports = router