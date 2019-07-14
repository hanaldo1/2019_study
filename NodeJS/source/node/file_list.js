const testFolder = '../data';
const fs = require('fs');

fs.readdir(testFolder,(err, files) => {
    // files.forEach(file => {
    //     console.log(file);
    // });
    console.log(files);
});

// 2
/*
var testFolder = './test/';
var fs = require('fs');

fs.readdir(testFolder, function(err, files){
    console.log(files);
})
*/