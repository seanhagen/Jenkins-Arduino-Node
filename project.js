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
      http.get( self.getUrl(), function(res){
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
        console.log( "Error getting data for "+ self.getName() + ":", e );
      });
    };

    this.parseStatus = function(string){
      var data;
      var color;
      var flashing = 0;

      try {
        data = JSON.parse( string );
      } catch ( e ){
        console.log( "unable to parse string: ", e );
        return;
      }

      if ( data === undefined ){
        return;
      }

      switch (data.color){
      case "blue_anime":
        flashing = 1;
      case "blue":
        status=1;
        break;

      case "red_anime":
        flashing = 1;
      case "red":
        status=2;
        break;

      case "yellow_anime":
        flashing = 1;
      case "yellow":
        status=3;
        break;
      }

      status = {
        status: status,
        flashing: flashing
      };
    };

    this.getStatus = function(){
      if ( status === null ){
        self.grabStatus(function(string){
          self.parseStatus(string);
        }, self );
        return undefined;
      }
      self.grabStatus();
      return status;
    };

    eventEmitter.on( 'gotStatus', self.parseStatus );
  };

  return constructor;
})();

exports.project = project;
