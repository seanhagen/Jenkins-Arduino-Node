project = require('./project').project
events = require('events')
eventEmitter = new events.EventEmitter()
serialPort = require('serialport').SerialPort

class Manager

  projects: []
  indexes: {}

  constructor: (sp,event) ->
    @serialComm = sp
    @event = event

  addProject: (pr) ->
    pr = new project(pr)
    @indexes[ pr.getName() ] = @projects.length
    @projects.push pr
    { length: @projects.length, project: pr }

  getStatus: () ->
    statuses = {}

    @projects.forEach (project) =>
      console.log "project: ", project.getName(), project.getStatus()
      @statuses[ project.getName() ] = project.getStatus()

    return statuses

  getSerialStatus: () ->
    statuses = @getStatus
    retString = ""

    retValues = new Array( statuses.length )

module.exports = Manager
