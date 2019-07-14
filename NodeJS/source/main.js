var http = require('http');
var fs = require('fs');
var url = require('url'); //module
var qs = require('querystring');
var template = require('./lib/module2.js');
var path = require('path');
var cookie = require('cookie');

function authIsOwner(request, reponse){
    var IsOwner = false;
    var cookies = {}
    if(request.headers.cookie){
        cookies = cookie.parse(request.headers.cookie);
    }
    if(cookies.email === 'test@email.com' && cookies.password === '1111'){
        IsOwner = true;
    }
    return IsOwner;
}

function authStatus(request, response){
    var authStatusUI = '<a href="/login">LOGIN</a>'
    if(authIsOwner(request, response)){
        authStatusUI = '<a href="/logout_process">LOGOUT</a>'
    }
    return authStatusUI
}

var app = http.createServer(function (request, response) {
    var _url = request.url;
    // 9, 10강 url을 통해서 입력된 값 사용, 동적인 웹페이지 만들기 
    var queryData = url.parse(_url,true).query;
    var pathname = url.parse(_url, false).pathname; // 18강 not found 구현

    if(pathname === '/'){
        // 11, 12강 파일 읽기 기능, 파일을 이용해 본문 구현
        if(queryData.id === undefined){ // home page라면
            // 23, 24 파일 목록 출력
            fs.readdir('./data/', function(err, files){
                var title = 'welcome';
                var description = "home page"; 
                var list = template.list(files);
                var html = template.html(title, list, 
                    `<h2>${title}</h2>${description}`,  
                    '<a href="/create">create</a>',
                    authStatus(request, response));
                
                response.writeHead(200);
                response.end(html);
            })
        }
        else{
            fs.readdir('./data/', function(err, files){
                var filteredId = path.parse(queryData.id).base;
                fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
                    var list =  template.list(files);
                    var title = queryData.id;
                    var html = template.html(title, list, 
                        `<h2>${title}</h2>${description}`, 
                        `<a href="/create">create</a> 
                         <a href="/update?id=${title}">update</a>
                         <form action="/delete_process" method="post">
                            <input type="hidden" name="id" value="${title}">
                            <input type="submit" value="delete">
                         </form>`,
                         authStatus(request, response)
                    );
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    }
    else if(pathname === '/create'){
        if(authIsOwner(request, response) === false){
            response.end('login please');
            return false
        }
        fs.readdir('./data/', function(err, files){
            var title = "web - create"
            var list = template.list(files);
            var html = template.html(title, list, `
                <form method="post" action="http://localhost:3000/create_process">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p><textarea name="description" placeholder="description"></textarea></p>
                    <p><input type="submit"></p>
                </form>
            `, '', authStatus(request, response));
            response.writeHead(200);
            response.end(html);
        })
    }
    else if(pathname === '/create_process'){
        if(authIsOwner(request, response) === false){
            response.end('login please');
            return false
        }
        var body = '';
        request.on('data',function(data){
            body += data;
        });
        request.on('end',function(){
            var post = qs.parse(body);
            var title = post.title
            var filteredtitle = path.parse(queryData.id).base;
            fs.writeFile(`./data/${filteredtitle}`,post.description, function(err){
                response.writeHead(302, {Location : `/?id=${title}`});
                response.end();
            });
        });
    }
    else if(pathname === '/update'){
        if(authIsOwner(request, response) === false){
            response.end('login please');
            return false
        }
        fs.readdir('./data/', function(err, files){
            var filteredId = path.parse(queryData.id).base;
            fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
                var list =  template.list(files);
                var title = queryData.id;
                var html = template.html(title, list, 
                    ` <form method="post" action="/update_process">
                        <input type="hidden" name="id" value="${title}">
                        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                        <p><textarea name="description" placeholder="description">${description}</textarea></p>
                        <p><input type="submit"></p>
                    </form>`, '', authStatus(request, response));
                response.writeHead(200);
                response.end(html);
            });
        });
    }
    else if(pathname === '/update_process'){
        if(authIsOwner(request, response) === false){
            response.end('login please');
            return false
        }
        var body = '';
        request.on('data',function(data){
            body += data;
        });
        request.on('end',function(){
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            fs.rename(`./data/${id}`,`./data/${title}`,function(err){
                fs.writeFile(`./data/${title}`,post.description, function(err){
                    response.writeHead(302, {Location : `/?id=${title}`});
                    response.end();
                });
            })
        });
    }
    else if(pathname === '/delete_process'){
        if(authIsOwner(request, response) === false){
            response.end('login please');
            return false
        }
        var body = '';
        request.on('data',function(data){
            body += data;
        });
        request.on('end',function(){
            var post = qs.parse(body);
            var id = post.id;
            var filteredId = path.parse(queryData.id).base;
            fs.unlink(`./data/${filteredId}`,function(err){
                response.writeHead(302, {Location : `/`});
                response.end();
            });
        });
    }
    else if(pathname === '/login'){
        fs.readdir('./data/', function(err, files){
            var title = 'login'; 
            var list = template.list(files);
            var html = template.html(title, list, 
                `
                <form method="post" action="/login_process">
                    <p><input type="text" name="email" placeholder="email"></p>
                    <p><input type="password" name="password" placeholder="password"></p>
                    <p><input type="submit"></p>
                </form>`
                ,  '<a href="/create">create</a>');
            
            response.writeHead(200);
            response.end(html);
        })
    }
    else if(pathname === '/login_process'){
        var body = '';
        request.on('data',function(data){
            body += data;
        });
        request.on('end',function(){
            var post = qs.parse(body);
            if (post.email === 'test@email.com' && post.password === '1111'){
                response.writeHead(302, {
                    'Set-Cookie':[`email=${post.email}`, `password=${post.password}`]
                    , Location : `/`
                });
                response.end();
            }
            else {
                response.end();
            }
        });
    }
    else if(pathname === '/logout_process'){
        if(authIsOwner(request, response) === false){
            response.end('login please');
            return false
        }
        var body = '';
        request.on('data',function(data){
            body += data;
        });
        request.on('end',function(){
            var post = qs.parse(body);
            response.writeHead(302, {
                'Set-Cookie':[`email=; Max-Age=0`, `password=; Max-Age=0`]
                , Location : `/`
            });
            response.end();
        });
    }
    else{
        response.writeHead(404);
        response.end('NOT FOUND');
    }
});
app.listen(3000);