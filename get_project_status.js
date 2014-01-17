var project = require('./project').project;

projects = [ 
  'SAPI-PR', 'SAPI-CI', 'SAPI-BUILD', 
  'Catalyst-PR', 'Catalyst-CI', 'Catalyst-BUILD',
  'Channelytics-PR', 'Channelytics-CI', 'Channelytics-BUILD'
];

var sapi = new project("SAPI-PR");

console.log( "Getting status for " + sapi.getName() );
sapi.getStatus();
setTimeout( sapi.getStatus, 2000);



