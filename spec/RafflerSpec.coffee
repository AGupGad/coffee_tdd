describe "RafflerApp", ->
  entries = undefined
  @collection = undefined
  
  beforeEach ->
    console.log 'Hello from Coffee TDD!'
    @collection = new Raffler.Collection.Entries()
    @collection.fetch()
    @view = new Raffler.Views.EntriesIndex(collection: @collection)
    @invisibleTempl = $('#item-template')

  afterEach ->
    console.log 'Bye Bye from coffee TDD!'
 
  describe "Jasmine TDD Framework", ->
    it "should be loaded successfully!", ->
     expect(1+1).toEqual 2

  describe "On Load Raffler App", ->
    it "should have a valid collection", ->
      expect(@collection).toBeDefined()
    it "view should contain appropriate collection", ->
      expect(@view.collection).toEqual @collection
    it "view should be rendered when initialized", ->
      entries = @collection.toJSON()
      expect(entries).toBeDefined
    it "length of entries should match entries in collection", ->
      expect(entries.length).toEqual(@collection.length)
    it "should have default attributes for model", ->
      theModel = new Raffler.Models.Entry
      expect(theModel.attributes.name).toBeDefined()
      expect(theModel.attributes.winner).toBeDefined()
    it "should have a valid localStorage defined", ->
      expect(@collection.localStorage).toBeDefined()

  describe "Creating a new entry", ->
    it "should increment collection length", ->
      origLen = @collection.length
      $('#new_entry').val('TDD_TestUserA')
      @view.createEntry()
      $('#new_entry').val('TDD_TestUserB')
      @view.createEntry()
      @collection.fetch()
      expect(@collection.length).toEqual(origLen+2)
    it "should reset input text field should be empty", ->
      expect($('#new_entry').val()).toEqual('')
    it "should have winner set to false by default", ->
      usera = @collection.where name:'TDD_TestUserA'
      userb = @collection.where name:'TDD_TestUserB'
      expect(usera[0].winner).toBeFalsy()
      expect(userb[0].winner).toBeFalsy()

  describe "Clicking Draw winner", ->
    it "should set atleast one entry to true", ->
      @view.drawWinner()
      @collection.fetch()
      item = @collection.where winner:true
      console.log item
      expect(item.length).toBeTruthy
      expect(item[0].get("winner")).toBeTruthy()
    
  describe "Clicking Reset Button", ->
    it "should reset all the entries to false", ->
      @view.reset()
      @collection.fetch()
      item = @collection.where winner:true
      expect(item.length).toEqual(0)

  describe "Clicking on an entry in HTML", ->
    it "should decrement the length of collection", ->
      currLen = @collection.length
      itemToDel = @collection.where name:'TDD_TestUserA'
      @view.deleteModel(itemToDel[0].id)
      @collection.fetch()
      expect(@collection.length).toEqual(currLen-1) 
    it "should remove the entry from collection", ->
      tryToGetItem = @collection.where name:'TDD_TestUserA'
      expect(tryToGetItem).toEqual []
      itemToDel = @collection.where name:'TDD_TestUserB'
      @view.deleteModel(itemToDel[0].id)




