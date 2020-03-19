// Интерфейс для работы с бд
var dbh = require("../dbh");

// Название таблицы лучше записать отдельно на случае, если понадобится переименование
var table = 'users';

module.exports = {
	// Создание
	create(data) {
		return dbh.add(table,[data]);
	},
	login(login, password){
		return dbh.get_sql('SELECT * FROM `'+table+'` WHERE (`login` = "'+login+'" AND `password` = "'+password+'")');		
	},
	// Нахождение по номеру
	gti(id) {
		return this.get_by_id(id);
	},
	get_by_id(id) {
		return dbh.gti(table,id);
	},
	get_by_login(login){
		return dbh.get_sql('SELECT login FROM `'+table+'` WHERE (`login` = "'+login+'")');		
	},
	list(offset,limit,options,start,dir,rev,count = false) {
		// offset	- отступ от начала выборки
		// limit	- количество выбираемых записей
		// options	- различные условия
		// start	- номер записи, начиная с которой необходимо выбирать
		// dir		- в каком направлении необходимо выбирать: вперед или назад
		// rev		- в каком порядке сортировать
		// count	- вернуть количество записей, подходящее под условия запроса
		return dbh.get_sql(
			'SELECT '+(
				count ? 'COUNT(*) count' : table+'.*'
			)+' FROM `'+table+'` '+
			'WHERE ('+
				(start ? '`id` '+(dir ? '>=' : '<=')+' '+start : '1')+
				(options.age>0 ? ' AND `age` = '+options.age	: '')+				
			') '+(
				count
				? ''
				: (
					'GROUP BY ' + table+'.`id` '+
					'ORDER BY `'+ table+'`.`id` '+(rev ? 'DESC' : 'ASC')+' '+
					(limit ? 'LIMIT '+offset+','+limit : '')
				)
			)
		);
	},
	// Изменение
	update(id,options) {
		return dbh.update(table,'`id` = '+id,options);
	},
	// Удаление
	delete(id) {
		return dbh.delete(table,'`id` = '+id);
	},
	// Ложное удаление, указываем `deleted`=1
	fake_delete(id) {
		return dbh.fake_delete(table,'`id` = '+id);
	},
	// Восстановление, возвращаем `deleted`=0
	reability(id) {
		return dbh.reability(table,'`id` = '+id);
	},
}
