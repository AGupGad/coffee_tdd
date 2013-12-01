// Generated by CoffeeScript 1.6.3
(function() {
  var _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Raffler = {
    Models: {},
    Collection: {},
    Views: {},
    Routers: {},
    init: function() {
      console.log('Hello from Backbone!');
      new Raffler.Routers.Entries;
      return Backbone.history.start();
    }
  };

  Raffler.Views.EntriesIndex = (function(_super) {
    __extends(EntriesIndex, _super);

    function EntriesIndex() {
      _ref = EntriesIndex.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    EntriesIndex.prototype.template = _.template($('#item-template').html());

    EntriesIndex.prototype.events = {
      'click #new': 'createEntry',
      'click #draw': 'drawWinner',
      'click li': 'kill',
      'click #reset': 'reset'
    };

    EntriesIndex.prototype.initialize = function() {
      console.log("In Application view");
      this.collection.on('sync', this.render, this);
      this.collection.on('add', this.render, this);
      this.collection.on('remove', this.render, this);
      return this.collection.fetch();
    };

    EntriesIndex.prototype.render = function() {
      $(this.el).html(this.template({
        entries: this.collection.toJSON()
      }));
      return this;
    };

    EntriesIndex.prototype.createEntry = function() {
      var value;
      value = $('#new_entry').val().trim();
      this.collection.create({
        name: value
      });
      return $('#new_entry').val('');
    };

    EntriesIndex.prototype.drawWinner = function() {
      var winner;
      winner = this.collection.shuffle()[0];
      if (winner && winner.get("winner") !== true) {
        winner.set({
          winner: true
        });
        return winner.save();
      }
    };

    EntriesIndex.prototype.kill = function(ev) {
      console.log($(ev.target).attr('id'));
      return this.deleteModel($(ev.target).attr('id'));
    };

    EntriesIndex.prototype.deleteModel = function(thisID) {
      var item;
      item = this.collection.find(function(model) {
        return model.get("id") === thisID;
      });
      return item.destroy();
    };

    EntriesIndex.prototype.reset = function() {
      var data, prevwin, _i, _len, _results;
      prevwin = this.collection.where({
        winner: true
      });
      if (prevwin.length !== 0) {
        _results = [];
        for (_i = 0, _len = prevwin.length; _i < _len; _i++) {
          data = prevwin[_i];
          data.set({
            winner: false
          });
          _results.push(data.save());
        }
        return _results;
      }
    };

    return EntriesIndex;

  })(Backbone.View);

  Raffler.Routers.Entries = (function(_super) {
    __extends(Entries, _super);

    function Entries() {
      _ref1 = Entries.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Entries.prototype.routes = {
      '': 'index',
      'entries/:id': 'show'
    };

    Entries.prototype.initialize = function() {
      this.collection = new Raffler.Collection.Entries();
      return this.collection.fetch();
    };

    Entries.prototype.index = function() {
      var view;
      console.log("home page");
      view = new Raffler.Views.EntriesIndex({
        collection: this.collection
      });
      return $('#container').html(view.render().el);
    };

    Entries.prototype.show = function(id) {
      return console.log("Entry " + id);
    };

    return Entries;

  })(Backbone.Router);

  Raffler.Models.Entry = (function(_super) {
    __extends(Entry, _super);

    function Entry() {
      _ref2 = Entry.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Entry.prototype.defaults = {
      name: '',
      winner: false
    };

    return Entry;

  })(Backbone.Model);

  Raffler.Collection.Entries = (function(_super) {
    __extends(Entries, _super);

    function Entries() {
      _ref3 = Entries.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Entries.prototype.model = Raffler.Models.Entry;

    Entries.prototype.url = '/coffeescripts';

    Entries.prototype.localStorage = new Store("backbone-coffee-raffle_with_reset");

    Entries.prototype.defaults = {
      name: '',
      winner: false
    };

    return Entries;

  })(Backbone.Collection);

  $(document).ready(function() {
    return Raffler.init();
  });

}).call(this);