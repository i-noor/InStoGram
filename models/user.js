// Интерфейс для работы с бд
var dbh = require("../dbh");

// Название таблицы лучше записать отдельно на случае, если понадобится переименование
var table = 'users';

module.exports = {
	// Создание
	create(data) {
		return dbh.add(table,[data]);
	},
	// Нахождение по номеру
	gti(id) {
		return this.get_by_id(id);
	},
	get_by_id(id) {
		return dbh.gti(table,id);
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
				count ? 'COUNT(*) count' : '`user`.*'
			)+' FROM `'+table+'` '+
			'WHERE ('+
				(start ? '`id` '+(dir ? '>=' : '<=')+' '+start : '1')+' AND '+
				(options.age>0 ? '`age` = '+options.age+' AND '	: '')+
				'`deleted` = 0 '+
			') '+(
				count
				? ''
				: (
					'GROUP BY `user`.`id` '+
					'ORDER BY `user`.`id` '+(rev ? 'DESC' : 'ASC')+' '+
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
