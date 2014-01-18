http = require 'http'
events = require 'events'
eventEmitter = new events.EventEmitter()

urlPrefix = "http://192.168.0.152:8080/job/"
urlSuffix = "/api/json"

class Project extends eventEmitter

  status: null
  blinking: false

  constructor: (name, event) ->
    @name = name
    @url = urlPrefix + name + urlSuffix
    @events = event

    @setGrabTime 5010
    @setEmitTime 900

    setTimeout @emitStatus, @checktime
    @grabStatus()

  getName: () ->
    @name

  setName: (name) ->
    @name = name

  getEmitTime: () ->
    @emittime

  setEmitTime: (time) ->
    @emittime = time

  getGrabTime: () ->
    @grabtime

  setGrabTime: (time) ->
    @grabtime = time

  emitStatus: () ->
    @emit 'projectStatus',
      status: @status
      blinking: @blinking

    setTimeout @emitStatus, @checktime

  setStatus: (status,blinking) ->
    @status = status
    @blinking = blinking

  grabStatus: () ->
    getter = http.get @url, (res) ->
      body = ''

      res.on 'data', (chunk) =>
        body += chunk

      res.on 'end', () =>
        @parseStatus body

    getter.on 'error', (error) ->
      console.log "Error getting data for " + @name + ":", error

    setTimeout @grabStatus, @grabtime

  parseStatus: (string) ->
    try
      data = JSON.parse string
    catch e
      console.log "Unable to parse string: ", e
      return

    if data == undefined
      return

    flashing = 0
    
    switch data.color
      when "blue_anime" 
        flashing = 1
        status = 1
      when "yellow_anime" 
        flashing = 1
        status = 2
      when "red_anime" 
        flashing = 1
        status = 3
      when "blue" then status = 1
      when "yellow" then status = 2
      when "red" then status = 3

    @setStatus status, flashing 

    
    
  
