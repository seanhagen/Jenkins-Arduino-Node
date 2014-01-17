var events = require('events');
var eventEmitter = new events.EventEmitter();

var manager = (function(){
  
  var constructor = function Manager(){
    if ( !( this instanceof Manager ) ){
      return new Manager();
    }

    var self = this;
    var projects = [];

    this.addProject = function(pr){
      if ( !(pr instanceof Project) ){
        console.log("addProject requires a Project as the argument!");
        return -1;
      }

      projects.push( pr );
      return projects.length;
    };

    this.getStatus = function(){
      var statuses = {};

      projects.forEach( function(project){
        //statuses[ project.getName() ] = project.
      });

    }
  };


  return constructor;
});

exports.manager = manager;
