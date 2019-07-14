module.exports = {
    IsLogin:function(request, response){
        if(request.session.isLogin){
            return true
        }
        else{
            return false
        }
    },
    Status:function(request, response){
        var authStatusUI = '<a href="/auth/login">LOGIN</a>'
        if(this.IsLogin(request, response)){
            authStatusUI =  `${request.session.nickname} | <a href="/auth/logout">LOGOUT</a>`
        }
        return authStatusUI
    }
}