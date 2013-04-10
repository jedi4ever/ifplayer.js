var events = require('events');
var util   = require('util');

// Load ifvms parser
var ifvms = require('ifvms');

function IfPlayer(filename) {


  // Keep track of ourselves
  var self = this;

  // Inherit from EventEmitter
  events.EventEmitter.call(this);

  // Load the filename that was passed
  // if would be nice to specify some of the vm options here
  var vm;
  var lastRead;

  this.init = function() {
    vm = ifvms.bootstrap.zvm(filename,[]);
    // Process all events created on bootstrap
    this.processAll();
  }


  // Send the input
  this.send = function(command, callback){
    var order = lastRead;
    lastRead.response = command;

    // text, parse, time , routine, storer
    vm.inputEvent(order);

    //vm.inputEvent(order);

    // Now that we've send the order, process all responses
    self.processAll();
  }

  // Process all current orders
  this.processAll = function() {
    var orders = vm.orders;
    orders.forEach(function(order) {
      self.processOne(order);
    });
  }

  // The codes I found in zvm.js
  // stream, find, clear, eraseline, clear, get_cursor, cursor, height
  //
  // stream     css: , text:
  //      name: (status || main)
  //      css:
  //        font-weight (bold)
  //        font-style (italic)
  //        background-color
  //        color
  // stream     to: , data:
  //      to: (status || main)
  //      data: [ array of things to stream ]
  //
  // find       -> name:
  //      name: (status || main)
  //
  // clear      -> name:
  //      css:
  //
  // eraseline
  //
  // get_cursor -> addr (isArray)
  //
  // cursor     -> to (x,y)
  //
  // height     -> lines (used for Splitwindow)

  // INPUT!
  // read       -> buffer, parse, len, initiallen, time, routine, storer
  //      buffer:
  //      parse:
  //      len:
  //      initiallen:
  //      time:
  //      routine:
  //      storer:
  //
  // char     -> time, routine, storer
  //

  // save
  //       data:
  //       storer:
  //
  // tick TODO ?
  // quit TODO
  // restore TODO
  // Process one event
  this.processOne = function(order) {

    switch (order.code) {
      case 'stream':
        if (order.code === 'status') {
          // We ignore status updates here
          break;
        }

        if (order.text != undefined) {
          //console.log('***'+order.text);
          self.emit('output', order.text);
        }

        break;
      case 'read':
        self.emit('ready');
        lastRead = order;
        break;
      case 'find':
        // ignoring finds for now
        break;
      case 'quit':
        // FIXME
        // This misses the last output
        self.emit('quit');
        break;
      default:
        console.log('Unhandled code' + order.code);
        break;
    }
    //console.log(order);
  }

}

util.inherits(IfPlayer, events.EventEmitter);

module.exports = IfPlayer;
