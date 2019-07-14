// node.js 파일 읽기 기능
// crud
// create read update delete

var fs = require('fs'); //file system module
fs.readFile('sample.txt', 'utf8', function (err, data) {
   console.log(data); 
});



