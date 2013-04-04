(function(){
	(function(global, _, Backbone) {
    Offline.Storage.prototype.db = function(){
		if(!Offline.Storage.prototype._db){
			Offline.Storage.prototype.dbName = this.name;
			Offline.Storage.prototype.tblName = this.name + "_" + this.name;
			Offline.Storage.prototype._db = openDatabase(Offline.Storage.prototype.dbName, '1.0', 'backbone.offline.sql.db', Offline.Storage.prototype.sqldbsize);
			this._db.transaction(function(tr){
				tr.executeSql("CREATE TABLE IF NOT EXISTS " + Offline.Storage.prototype.tblName + " (key, value)", [],
						function(tr, result){
							return;
						},
						function(tr, error){
							return;
						}
				);
			});
			return this._db;
		}else{
			return this._db;
		}
	}
	Offline.Storage.prototype.dropTable = function(){
		this.db().transaction(function(tr){
			tr.executeSql("DROP TABLE IF EXISTS " + Offline.Storage.prototype.tblName, [], function(){}, function(){});
		});
	}
	Offline.Storage.prototype.setDbItem = function(){
		var _arguments = arguments;
		this.db().transaction(function(tr){
			tr.executeSql("SELECT count(*) c from " + Offline.Storage.prototype.tblName + " WHERE key=?", [_arguments[0]], 
				function(tr, result){
					if(result.rows.item(0).c==0){
						tr.executeSql("INSERT into " + Offline.Storage.prototype.tblName + " values(?,?)", [_arguments[0], _arguments[1]],
							function(tr, result){
								return;
							},
							function(tr, error){
								return;
							}
						);
					}else{
						tr.executeSql("UPDATE " + Offline.Storage.prototype.tblName + " set value=? where key = ?", [_arguments[1], _arguments[0]],
							function(tr, result){
								return;
							},
							function(tr, error){
								return;
							}
						);
					}
					return;
				},
				function(tr, error){
					return;
				}
			);
		});
	}
	
	Offline.Storage.prototype.removeDbItem = function(){
		var _arguments = arguments;
		this.db().transaction(function(tr){
			tr.executeSql("DELETE from " + Offline.Storage.prototype.tblName + " WHERE key=?", [_arguments[0]], 
				function(tr, result){
					return;
				},
				function(tr, error){
					return;
				}
			);
		});
	}
	
	Offline.Storage.prototype.getDbItem = function(){
		var _arguments = arguments;
		return this.db().transaction(function(tr){
			tr.executeSql("SELECT value from " + Offline.Storage.prototype.tblName + " WHERE key=?", [_arguments[0]], 
				function(tr, result){
					if(result.rows.length>0)
						return result.rows.item(0).value;
					else
						return null
				},
				function(tr, error){
					return;
				}
			);
		});
	}
	

	Offline.Storage.prototype._setItem = Offline.Storage.prototype.setItem;
	Offline.Storage.prototype.setItem = function(){
		if(this.dbtype=="websql")
			return Offline.Storage.prototype.setDbItem.apply(this, arguments);
		else
			return Offline.Storage.prototype._setItem.apply(this, arguments);
	}
	
	Offline.Storage.prototype._removeItem = Offline.Storage.prototype.removeItem;
	Offline.Storage.prototype.removeItem = function(){
		if(this.dbtype=="websql")
			return Offline.Storage.prototype.removeDbItem.apply(this, arguments);
		else
			return Offline.Storage.prototype._removeItem.apply(this, arguments);
	}
	
	Offline.Storage.prototype._getItem = Offline.Storage.prototype.getItem;
	Offline.Storage.prototype.getItem = function(){
		if(this.dbtype=="websql")
			return Offline.Storage.prototype.getDbItem.apply(this, arguments);
		else
			return Offline.Storage.prototype._getItem.apply(this, arguments);
	}
	Offline.Storage.prototype.dbtype = "websql";
	Offline.Storage.prototype.sqldbsize = 2*1024*1024;
	Offline.Storage.prototype.setup = function(options){
		if(options && (options.dbtype==="localStorage" || options.dbtype==="websql")){
			Offline.Storage.prototype.dbtype = options.dbtype;
		}
		if(options && options.dbsize){
			Offline.Storage.prototype.sqldbsize = options.dbsize;
		}
	}
	})(window, _, Backbone);
}).call(this);