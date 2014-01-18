var project = require('./project').project;
var manager = require('./manager').manager;

var SerialPort = require('serialport').SerialPort;

projects = [ 
  'SAPI-PR', 'SAPI-CI', 'SAPI-BUILD', 
  'Catalyst-PR', 'Catalyst-CI', //'Catalyst-BUILD',
  'Channelytics-PR', 'Channelytics-CI', 'Channelytics-BUILD'
];


var serialPort = new SerialPort( "/dev/ttyACM0", {}, false );
console.log( "serial port: ", serialPort );

serialPort.open( function(){ 
  console.log("serial port opened!");

  serialPort.on( "data", function(data){
    console.log("got data from arduino: ", data.toString() );
  });

  var state = 0;

  var test = function toggleLED(){
    var write = (state == 0)?"led on":"led off";
    console.log("writing '"+write+"' to serial");
    serialPort.write( write, function(err, results){
      state = (state == 0)?1:0;
    });
  };

  setInterval( test, 4000 );
});


/*
var sapi = new project("SAPI-PR");
var sapi2 = new project("SAPI-CI");

console.log( "Getting status for " + sapi.getName() );
console.log( "get status: ", sapi.getStatus() );

console.log( "Getting status for " + sapi2.getName() );
console.log( "get status: ", sapi2.getStatus() );

var test = function(){
  console.log( "delayed status: ", sapi.getStatus() );
  console.log( "delayed status 2: ", sapi2.getStatus() );
};

setInterval( test, 2000);

/*
var manager = new manager();

projects.forEach( function(name){
  var r = manager.addProject( name );
  console.log("added project at ", r.l, r.p.getName() );
});


manager.getStatus();

var f = function(){
  console.log( manager.getStatus() );
  console.log( '------------------' );
};

setInterval( f, 5000 );
*/
