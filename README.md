## About Backbone.offline.sql
Backbone.offline.sql is intended to be wrapper for Backbone.offline
The idea is to switch between any storage type

## Requirements

The library requirements are Underscore, Backbone, Backbone.offline.

## Installation

To use Backbone.offline.sql include the javascript in order
````
<script src="js/jquery-1.9.1.js"></script>
<script src="js/underscore-1.4.4.js"></script>
<script src="js/backbone-0.9.1.js"></script>
<script src="js/backbone.offline.js"></script>
<script src="js/backbone.offline.sql.js"></script>
````



## How to use

Simply continue the same as specified in Backbone.offline

## How it works

The wrapper automatically redirect all your add, delete, update operations to websql instead of localStorage
It creates the DB, Tables automatically with the name of the collection specified in
````
this.storage = new Offline.Storage('books', this);
````

## Fallback

````
collection.storage.setup({dbtype: "localStorage"});
````

This function call will make the Backbone.offline work as usual

## Future Idea

implementation for IndexedDB

### Special thanks

To Aleksey Kulikov for [Backbone.offline](https://raw.github.com/Ask11/backbone.offline)

### License

Licensed under MIT license. © 2013 Dickens A S, All Rights Reserved
[Full license text](https://github.com/dickensas/backbone.offline.sql/blob/master/LICENSE.md)
