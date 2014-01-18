var project = require('./project').project;
var events = require('events');
var eventEmitter = new events.EventEmitter();

var manager = (function(){
  
  var constructor = function Manager(){
    if ( !( this instanceof Manager ) ){
      return new Manager();
    }

    var self = this;
    var projects = [];
    var indexes = {};

    this.addProject = function(pr){
      pr = new project(pr);
      indexes[ pr.getName() ] = projects.length;

      projects.push( pr );
      return { l: projects.length, p: pr };
    };

    this.getStatus = function(){
      var statuses = {};

      projects.forEach( function(project){
        console.log( "project: ", project.getName(), project.getStatus() );
        statuses[ project.getName() ] = project.getStatus();
      });

      return statuses;
    };

    this.getSerialStatus = function(){
      var statuses = this.getStatus();
      var retString = "";

      var retValues = new Array( statuses.length );

      for ( var key in statuses ){
        var addVal = "";
        var value = statuses[key];
        var i = indexes[ key ];

        addVal = i + ":" + value.status + ":" +  value.flashing;

        retValues[i] = addVal;
      }

      return retValues.join(";");
    };

  };

  return constructor;
})();

exports.manager = manager;
