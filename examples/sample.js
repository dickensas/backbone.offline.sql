var Book = Backbone.Model.extend({
	url: 'http://localhost:3000/books'
});

var Books = Backbone.Collection.extend({
    model: Book,
    url: 'http://localhost:3000/books',
    initialize: function() {
      this.storage = new Offline.Storage('books', this);
    }
});

var books = new Books();
books.fetch();
