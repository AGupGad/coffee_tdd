// Generated by CoffeeScript 1.6.3
(function() {
  describe("RafflerApp", function() {
    var entries;
    entries = void 0;
    this.collection = void 0;
    beforeEach(function() {
      console.log('Hello from Coffee TDD!');
      this.collection = new Raffler.Collection.Entries();
      this.collection.fetch();
      this.view = new Raffler.Views.EntriesIndex({
        collection: this.collection
      });
      return this.invisibleTempl = $('#item-template');
    });
    afterEach(function() {
      return console.log('Bye Bye from coffee TDD!');
    });
    describe("Jasmine TDD Framework", function() {
      return it("should be loaded successfully!", function() {
        return expect(1 + 1).toEqual(2);
      });
    });
    describe("On Load Raffler App", function() {
      it("should have a valid collection", function() {
        return expect(this.collection).toBeDefined();
      });
      it("view should contain appropriate collection", function() {
        return expect(this.view.collection).toEqual(this.collection);
      });
      it("view should be rendered when initialized", function() {
        entries = this.collection.toJSON();
        return expect(entries).toBeDefined;
      });
      it("length of entries should match entries in collection", function() {
        return expect(entries.length).toEqual(this.collection.length);
      });
      it("should have default attributes for model", function() {
        var theModel;
        theModel = new Raffler.Models.Entry;
        expect(theModel.attributes.name).toBeDefined();
        return expect(theModel.attributes.winner).toBeDefined();
      });
      return it("should have a valid localStorage defined", function() {
        return expect(this.collection.localStorage).toBeDefined();
      });
    });
    describe("Creating a new entry", function() {
      it("should increment collection length", function() {
        var origLen;
        origLen = this.collection.length;
        $('#new_entry').val('TDD_TestUserA');
        this.view.createEntry();
        $('#new_entry').val('TDD_TestUserB');
        this.view.createEntry();
        this.collection.fetch();
        return expect(this.collection.length).toEqual(origLen + 2);
      });
      it("should reset input text field should be empty", function() {
        return expect($('#new_entry').val()).toEqual('');
      });
      return it("should have winner set to false by default", function() {
        var usera, userb;
        usera = this.collection.where({
          name: 'TDD_TestUserA'
        });
        userb = this.collection.where({
          name: 'TDD_TestUserB'
        });
        expect(usera[0].winner).toBeFalsy();
        return expect(userb[0].winner).toBeFalsy();
      });
    });
    describe("Clicking Draw winner", function() {
      return it("should set atleast one entry to true", function() {
        var item;
        this.view.drawWinner();
        this.collection.fetch();
        item = this.collection.where({
          winner: true
        });
        console.log(item);
        expect(item.length).toBeTruthy;
        return expect(item[0].get("winner")).toBeTruthy();
      });
    });
    describe("Clicking Reset Button", function() {
      return it("should reset all the entries to false", function() {
        var item;
        this.view.reset();
        this.collection.fetch();
        item = this.collection.where({
          winner: true
        });
        return expect(item.length).toEqual(0);
      });
    });
    return describe("Clicking on an entry in HTML", function() {
      it("should decrement the length of collection", function() {
        var currLen, itemToDel;
        currLen = this.collection.length;
        itemToDel = this.collection.where({
          name: 'TDD_TestUserA'
        });
        this.view.deleteModel(itemToDel[0].id);
        this.collection.fetch();
        return expect(this.collection.length).toEqual(currLen - 1);
      });
      return it("should remove the entry from collection", function() {
        var itemToDel, tryToGetItem;
        tryToGetItem = this.collection.where({
          name: 'TDD_TestUserA'
        });
        expect(tryToGetItem).toEqual([]);
        itemToDel = this.collection.where({
          name: 'TDD_TestUserB'
        });
        return this.view.deleteModel(itemToDel[0].id);
      });
    });
  });

}).call(this);