## Description

*ifplayer* is a nodejs module to play interaction-fiction files.

It is currently alpha-state and pretty much in flux, and are my first steps at understanding the z-machine.

## Dependencies

- To read the interactive-fiction files, it uses [ifvms.js](https://github.com/curiousdannii/ifvms.js/)
- We *borrowed* the etude as a text file for now

## Inspiration code

Take a look at : (thx to  @curiousdannii)

- <https://github.com/curiousdannii/ifvms.js/blob/master/dist/bootstrap.js> to see ZVM being used in node.js.
- <https://github.com/curiousdannii/parchment/blob/master/src/structio/runner.js> is used in Parchment on the web.

It's designed to be used with Web Workers (though it isn't yet...), so everything happens with two functions: ZVM.inputEvent() and ZVM.outputEvent().

## Installation

### From this repo

``$ npm install``

### From an official release (none yet)

``$ npm install ifplayer``

## Usage
### as console player

``$ ./bin/ifplayer <your-story-file>``

### as a player object

    ifplayer = new IfPlayer(filename);

    ifplayer.on('output', function(message) {
      console.log(message);
    })

    ifplayer.on('quit', function() {
      console.log('done');
    })

    ifplayer.on('ready', function(message) {
      // ifplayer.send('north');
    })

## Bugs & Todos

- currently the input is also written on the output : not sure if this by design or not
- the flow of output is not caught when quitting

- we need to separate the css code to a more abstract type so we can pass our own formatter
- sending the inputEvent is still a mess , as I don't really understand the required params, currently resorting to keeping the last read event

- obviously support mode code types
- make it read gluxl files and other format
- maybe use Inform i7 compiler for on the fly compilation
