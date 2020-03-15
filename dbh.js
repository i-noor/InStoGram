var f		= require("./functions");
var config	= require("./config").dbh;

var pool = require("mysql2").createPool(config);

pool.getConnection((err,connection) => {
	if(err) throw new Error('Ошибка: Нет соединения\n');
});

// Соединение
exports.dbh = pool;

// Строка из таблицы по номеру
exports.gti = function(table,id) {
	return new Promise((resolve,reject) => {
		var sql = "SELECT * FROM `"+table+"` WHERE `id` = "+id;
		this.dbh.query(sql,function(e,row) {
			if(e) {
				reject(e);
				console.log('Ошибка','Function gti('+table+','+id+'): '+this.sql+'\n'+e.message);
			} else {
				resolve(row[0] ? row[0] : false);
			}
		});
	});
}
// Полная информация о любой таблице
exports.get_table = function(table,options,debug_mode = false) {
	return new Promise((resolve,reject) => {
		var sql = "SELECT * FROM `"+table+"`";
		if(options['where'])		sql += ' WHERE '+options['where'];
		if(options['group_by'])		sql += ' GROUP BY '+options['group_by'];
		if(options['order_by'])		sql += ' ORDER BY '+options['order_by'];
		if(options['limit'])		sql += ' LIMIT '+options['limit'];
		if(options['offset'])		sql += ' OFFSET '+options['offset'];

		if(debug_mode) console.log(sql);

		this.dbh.query(sql,function(e,rows) {
			if(e) {
				reject(e);
				console.log('Ошибка','Function get_table('+table+'): '+this.sql+'\n'+e.message);
			} else {
				resolve(rows.length ? rows : false);
			}
		});
	});
}
// Произвольный запрос
exports.get_sql = function(sql,debug_mode = false) {
	return new Promise((resolve,reject) => {
		if(debug_mode) console.log(sql);
		this.dbh.query(sql,function(e,rows) {
			if(e) {
				reject(e);
				console.log('Ошибка','Function get_sql('+this.sql+')\n'+e.message);
			} else {
				resolve(rows.length ? rows : false);
			}
		});
	});
}

// Добавление
exports.add = function(table,options,debug_mode = false) {
	return new Promise((resolve,reject) => {
		if(!options) options = [];

		var keys = '',values = [];
		for(let i=0; i<options.length; i++) {
			values[i] = '';
			for(let j in options[i]) {
				if(i == 0) keys += ',`'+j+'`';
				if(options[i][j]===null)	values[i] += ',Null';
				else						values[i] += ',"'+f.addslashes(options[i][j])+'"';
			}
		}
		var sql = "INSERT INTO `"+table+"`("+(keys ? keys.substr(1) : '')+") VALUES("+(values[0] ? values[0].substr(1) : '')+")";
		for(let i=1; i<options.length; i++) sql +=",("+(values[i] ? values[i].substr(1) : '')+")";

		if(debug_mode) console.log(sql);

		this.dbh.query(sql,function(e,res) {
			if(e) {
				reject(e);
				console.log('Ошибка','Function add('+table+'): '+this.sql+'\n',e.message);
			} else {
				console.log(res)
				resolve(res);
			}
		});
	});
}

// Обновление
exports.update = function(table,where_clause,options,debug_mode = false) {
	return new Promise((resolve,reject) => {
		var sql = "UPDATE `"+table+"` SET ? WHERE "+where_clause;
		if(debug_mode) console.log(options,sql);
		this.dbh.query(sql,options,function(e,res) {
			if(e) {
				reject(e);
				console.log('Ошибка','Function update('+table+'): '+this.sql+'\n'+e.message);
			} else {
				resolve(res);
			}
		});
	});
}
exports.clear_update = function(table,where_clause,options,debug_mode = false) {
	return new Promise((resolve,reject) => {
		var set = '';
		for(let i in options) set += ',`'+i+'`='+f.addslashes(options[i]);
		var sql = "UPDATE `"+table+"` SET "+set.substr(1)+" WHERE "+where_clause;
		if(debug_mode) console.log(sql);
		this.dbh.query(sql,function(e,res) {
			if(e) {
				reject(e);
				console.log('Ошибка','Function update('+table+'): '+this.sql+'\n'+e.message);
			} else {
				resolve(res);
			}
		});
	});
}

// Удаление
exports.delete = function(table,where_clause,debug_mode = false) {
	return new Promise((resolve,reject) => {
		var sql = "DELETE FROM `"+table+"` WHERE "+where_clause;
		if(debug_mode) console.log(sql);
		this.dbh.query(sql,function(e,res) {
			if(e) {
				reject(e);
				console.log('Ошибка','Function delete('+table+'): '+this.sql+'\n'+e.message);
			} else {
				resolve(res);
			}
		});
	});
}

// Ложное удаление
exports.fake_delete = function(table,where_clause,debug_mode = false) {
	return new Promise((resolve,reject) => {
		var sql = "UPDATE `"+table+"` SET `deleted`=1 WHERE "+where_clause;
		if(debug_mode) console.log(sql);
		this.dbh.query(sql,function(e,res) {
			if(e) {
				reject(e);
				console.log('Ошибка','Function fake_delete('+table+'): '+this.sql+'\n'+e.message);
			} else {
				resolve(res);
			}
		});
	});
}
// Восстановление
exports.reability = function(table,where_clause,debug_mode = false) {
	return new Promise((resolve,reject) => {
		var sql = "UPDATE `"+table+"` SET `deleted`=0 WHERE "+where_clause;
		if(debug_mode) console.log(sql);
		this.dbh.query(sql,function(e,res) {
			if(e) {
				reject(e);
				console.log('Ошибка','Function reability('+table+'): '+this.sql+'\n'+e.message);
			} else {
				resolve(res);
			}
		});
	});
}
