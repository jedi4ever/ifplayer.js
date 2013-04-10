#!/usr/bin/env node

// Parse arguments
var argv  = require('optimist').argv;

var IfPlayer = require('../lib/ifplayer');

var filename ;
if (argv._.length > 0) {
  // Take the first non-hypenated option
  filename = argv._[0]
} else {
  console.log("Usage: if-play.js <filename>");
  process.exit(1);
}

ifplayer = new IfPlayer(filename);

ifplayer.on('output', function(message) {
  process.stdout.write(message);
})

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

ifplayer.on('ready', function(message) {
  rl.question("> ", function(answer) {
    ifplayer.send(answer);
   });
})

ifplayer.on('quit', function() {
    rl.close();
    process.exit(0);
});

try {
  ifplayer.init();
} catch (ex) {
  process.stdout.write(ex+"\n");
  process.exit(1);
}
