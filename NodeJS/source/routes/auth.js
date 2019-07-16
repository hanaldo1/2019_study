var express = require('express')
var router = express.Router()
var auth = require('../lib/auth.js');
var template = require('../lib/module.js');

router.get('/login', function(request, response){
    var title = "web - login"
    var list = template.list(request.list);

    var html = template.html(title, list, `
        <form method="post" action="/auth/login_process">
            <p><input type="text" name="email" placeholder="email"></p>
            <p><input type="password" name="password" placeholder="password"></p>
            <p><input type="submit" value="login"></p>
        </form>
    `, '', auth.Status(request, response) );
    response.send(html);
})

// router.post('/login_process', function(request, response){
//     var post = request.body;
//     var email = post.email;
//     var password = post.password;

//     if(email === 'aaa@email.com' && password === '1111'){
//         request.session.isLogin = true
//         request.session.nickname = 'aaa'
//         request.session.save(function(err){
//             response.redirect('/');
//         })
//     }
//     else{
//         response.send('who?');
//     }
// })

// login process passport


router.get('/logout', function(request, response){
    request.session.destroy(function(err){
        response.redirect('/');
    })
})


module.exports = router