var project = require('./project').project;
var SerialPort = require('serialport').SerialPort;

projects = [ 
  'SAPI-PR', 'SAPI-CI', 'SAPI-BUILD', 
  'Catalyst-PR', 'Catalyst-CI', 'Catalyst-BUILD',
  'Channelytics-PR', 'Channelytics-CI', 'Channelytics-BUILD'
];

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

  
})

/*
var sapi = new project("SAPI-PR");

console.log( "Getting status for " + sapi.getName() );
sapi.getStatus();
setTimeout( sapi.getStatus, 2000);
*/


