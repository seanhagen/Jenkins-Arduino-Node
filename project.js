var http = require('http');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var project = (function(){

  var constructor = function Project(name){
    if ( !(this instanceof Project) ){
      return new Project(name);
    }

    var self = this;

    var checktime = 1000;
    var url = "http://192.168.0.152:8080/job/"+name+"/api/json";

    var status = null;
    var blinking = false;

    this.getName = function(){ return name; };
    this.setName = function(n){ name = n; };

    this.getTime = function(){ return checktime; };
    this.setTime = function(t){ checktime = t; };

    this.getUrl = function(){ return url; };

    this.grabStatus =  function(callback){
      var self = this;
      http.get( this.getUrl(), function(res){
        var body = '';

        res.on( 'data', function(chunk){
          body += chunk;
        });

        res.on('end', function(){
          if ( callback !== undefined ){
            callback( body );
            return;
          }
          eventEmitter.emit( 'gotStatus', body );
        });

      }).on( 'error', function(e){
        console.log( "Error getting data for "+ this.getName() + ":", e );
      });
    };

    this.parseStatus = function(string){
      var data = JSON.parse( string );

      switch (data.color){
      case "blue":
        status="good";
        break;

      case "red":
        status="fail";
        break;

      }

    };

    this.getStatus = function(){
      if ( status === null ){
        this.grabStatus(function(string){
          self.parseStatus(string);
          console.log( "(callback)status: ", status );
        });
        return;
      }

      console.log( "(immediate)status: ", status );
    };

    eventEmitter.on( 'gotStatus', this.parseStatus );
  };

  constructor.prototype.test = function(){
    console.log( "name: ", this.getName() );
    console.log( "checktime: ", this.getTime() );
  };

  return constructor;
})();

exports.project = project;
