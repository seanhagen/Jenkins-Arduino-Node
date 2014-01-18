var project = require('./project').project;
var manager = require('./manager').manager;
//var SerialPort = require('serialport').SerialPort;

projects = [ 
  'SAPI-PR', 'SAPI-CI', 'SAPI-BUILD', 
  'Catalyst-PR', 'Catalyst-CI', //'Catalyst-BUILD',
  'Channelytics-PR', 'Channelytics-CI', 'Channelytics-BUILD'
];

/*
var serialPort = new SerialPort( "/dev/ttyACM0", {}, false );
console.log( "serial port: ", serialPort );

serialPort.open( function(){ 
  console.log("serial port opened!");

  serialPort.on( "data", function(data){
    console.log("got data from arduino: ", data );
  });

  /*
  var test = function(){
    console.log("writing 'b' to serial");
    serialPort.write("b", function(err, results){
      console.log("err: ", err );
      console.log("results: ", results );
    });
  }

  setTimeout( test, 1000 );
   */
  
//})

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
