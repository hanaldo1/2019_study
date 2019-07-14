var http = require('http')
var cookie = require('cookie')

var app = http.createServer(function(request, response){
    response.writeHead(200, {
        'Set-Cookie' : ['ice=bear', `permanent=cookie; Max-Age=${60*60*24*30}`]
    });
    var cookies = {};
    if(request.headers.cookie != undefined){
        cookies = cookie.parse(request.headers.cookie);
    }
    console.log(cookies)
    response.end('cookie');
});

app.listen(3000);