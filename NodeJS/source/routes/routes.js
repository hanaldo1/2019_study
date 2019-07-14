var express = require('express')
var router = express.Router()
var fs = require('fs');
var template = require('../lib/module.js');
var auth = require('../lib/auth.js');
var path = require('path');

router.get('/create', function(request, response){
    if(!auth.IsLogin(request, response)){
        response.redirect('/');
        return false
    }
    var title = "web - create"
    var list = template.list(request.list);
    var html = template.html(title, list, `
        <form method="post" action="http://localhost:3000/topic/create_process">
            <p><input type="text" name="title" placeholder="title"></p>
            <p><textarea name="description" placeholder="description"></textarea></p>
            <p><input type="submit"></p>
        </form>
    `, '', auth.Status(request, response));
    response.send(html);
})

router.post('/create_process', function(request, response){
    if(!auth.IsLogin(request, response)){
        response.redirect('/');
        return false
    }
    var post = request.body
    var title = post.title
    fs.writeFile(`./data/${title}`, post.description, function(err){
        response.writeHead(302, {Location : `/topic/${title}`});
        response.end();
    });
})

router.get('/update/:pageId', function(request, response){
    if(!auth.IsLogin(request, response)){
        response.redirect('/');
        return false
    }
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
        var list =  template.list(request.list);
        var title = filteredId;
        var html = template.html(title, list, 
            ` <form method="post" action="/topic/update_process">
                <input type="hidden" name="id" value="${title}">
                <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                <p><textarea name="description" placeholder="description">${description}</textarea></p>
                <p><input type="submit"></p>
            </form>`, '', auth.Status(request, response));
        response.send(html);
    });
})

router.post('/update_process', function(request, response){
    if(!auth.IsLogin(request, response)){
        response.redirect('/');
        return false
    }
    var post = request.body
    var id = post.id;
    var title = post.title;
    fs.rename(`./data/${id}`,`./data/${title}`,function(err){
        fs.writeFile(`./data/${title}`,post.description, function(err){
            response.redirect(302, `/topic/${title}`);
        });
    })
})

router.post('/delete_process/:pageId', function(request, response){
    if(!auth.IsLogin(request, response)){
        response.redirect('/');
        return false
    }
    var post = request.body
    var id = post.id;
    var filteredId = path.parse(request.params.pageId).base;
    fs.unlink(`./data/${filteredId}`,function(err){
        response.redirect(302, '/');
    });
})

router.get('/:pageId', function(request, response, next){
    if(!auth.IsLogin(request, response)){
        response.redirect('/');
        return false
    }
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
        if (err) { return next(err); }
        var list =  template.list(request.list);
        var title = filteredId;
        var html = template.html(title, list, 
            `<h2>${title}</h2>${description}`, 
            `<a href="/topic/create">create</a> 
                <a href="/topic/update/${filteredId}">update</a>
                <form action="/topic/delete_process/${filteredId}" method="post">
                <input type="hidden" name="id" value="${title}">
                <input type="submit" value="delete">
                </form>
            `, auth.Status(request, response)
            );
        response.send(html)
    });
})

module.exports = router