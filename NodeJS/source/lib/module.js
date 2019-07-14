module.exports = {
    html:function (title, list, body, control, authStatusUI = '<a href="/auth/login">LOGIN</a>') {
        return `
        <!doctype html>
        <html>
        <head>
            <title>${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            ${authStatusUI}
            <h1><a href="/">WEB</a></h1>
            ${list}
            ${control}
            ${body}
        </body>
        </html>
        `;
    },
    list:function (files) {
        var list = '<ul>'; 
        for(var i=0;i<files.length;i++){
            list += `<li><a href="/topic/${files[i]}"> ${files[i]} </a></li>`;
        }
        list += '</ul>'; 
    
        return list;
    }
}
