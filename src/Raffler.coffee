window.Raffler=
  Models: {}
  Collection: {}
  Views: {}
  Routers: {}
  init: ->
    console.log 'Hello from Backbone!'
    new Raffler.Routers.Entries
    Backbone.history.start()

class Raffler.Views.EntriesIndex extends Backbone.View
  template: _.template($('#item-template').html())
  events:
    'click #new': 'createEntry'
    'click #draw': 'drawWinner'
    'click li': 'kill'
    'click #reset': 'reset'
  initialize: ->
    console.log "In Application view"
    @collection.on('sync', @render, this)
    @collection.on('add', @render, this)
    @collection.on('remove', @render, this)
    @collection.fetch()
  render: ->
    $(@el).html(@template(entries: @collection.toJSON()))
    @
  createEntry: ->
    value = $('#new_entry').val().trim()
    @collection.create({name:value})
    $('#new_entry').val('')
  drawWinner: ->
    winner = @collection.shuffle()[0]
    if winner and winner.get("winner") isnt true
      winner.set(winner:true)
      winner.save()

  kill: (ev) ->
    console.log $(ev.target).attr('id') # log the jquery selector for debug
    @deleteModel($(ev.target).attr('id'))
	
  deleteModel: (thisID) ->
    item=@collection.find (model) ->
      model.get("id") is thisID
    item.destroy()

  reset: ->
    prevwin = @collection.where winner:true
    if prevwin.length isnt 0
     for data in prevwin
       data.set(winner:false)
       data.save()

class Raffler.Routers.Entries extends Backbone.Router
  routes:
    '': 'index'
    'entries/:id': 'show'
  initialize: ->
    @collection = new Raffler.Collection.Entries()
    @collection.fetch()
  index: ->
    console.log "home page"
    view = new Raffler.Views.EntriesIndex(collection: @collection)
    $('#container').html(view.render().el)
  show: (id) ->
    console.log "Entry #{id}"



class Raffler.Models.Entry extends Backbone.Model
  defaults:
    name:''
    winner: false

class Raffler.Collection.Entries extends Backbone.Collection
  model: Raffler.Models.Entry
  url  : '/coffeescripts'
  localStorage: new Store("backbone-coffee-raffle_with_reset")
  defaults:
    name:''
    winner: false

$(document).ready ->
  Raffler.init()