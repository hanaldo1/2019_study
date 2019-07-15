var commander = require('commander');
var open = require('open');
var progress = require('progress');

var bar = new progress('  open [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: 0
});

commander
    // .arguments('<count>')
    // .option('-u, --username <username>','Your name')
    // .option('-e, --email <email>','Your Email Address')
    // .action(function(count){
    //     for(var i = 0; i < count; i++){
    //         console.log(`user: ${commander.username}, email: ${commander.email}, print count: ${count}`);
    //     }
    // });
    .arguments('<browser>')
    .option('-u, --url <url>','target url')
    .action(function(browser){
        bar.tick()

        open(commander.url, {app: browser}, function(response){
            if(response instanceof Error){ console.log(response.message); }
        });
    })

commander.parse(process.argv);