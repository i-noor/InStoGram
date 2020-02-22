// Полезные функции
var f = require("../functions");

// Модель для работы с бд
var model = require("../models/user");

// Для сущности "пользователь" у нас будет определено несколько методов

// Добавление
exports.add = (req,res) => {
	var data = req.body;
	console.log(req)
	// Обязательное поле
	if(!('name' in data) || data.name == '') return res.send({error:'parameter name is not defined'});

	var name = f.htmlspecialchars(data.name);
	var age = +f.parse_int(data.age);

	try {
		// Нужно проверить все входные данные
		var user_id = ( model.create({
			name:	name,
			age:	age,
		})).insertId;

		res.send({response:user_id});
	} catch (err) {
		res.send({error:'internal_error'});
	}
}
// Получение
exports.get = async (req,res) => {
	var data = req.body;

	var id = +f.parse_int(data.id);

	try {
		var output = await model.gti(id);

		res.send({response:output});
	} catch (err) {
		res.send({error:'internal_error'});
	}
}
// Получение списка
exports.list = async (req,res) => {
	var data = req.body;

	// Проверяем входные параметры
	var offset			= +f.parse_int(data.offset);
	var limit			= +f.parse_int(data.limit);
	var start			= +f.parse_int(data.start_application_id);
	var dir				= [false,true][data.dir];
	var rev				= [false,true][data.rev];

	if(offset < 0)		offset = 0;

	if(limit == 0)		limit = 20;
	else if(limit <  0)	limit =  1;
	else if(limit > 50) limit = 50;

	if(start < 0)		start = 0;

	var options = {};

	var age = +f.parse_int(data.age);
	if(age>0) options.age = age;

	var output = {count:0,items:[]};

	try {
		await Promise.all([
			model.list(offset,limit,options,start,dir,rev,1).then(data => output.count = data),
			model.list(offset,limit,options,start,dir,rev)  .then(data => output.items = (data ? data : [])),
		]);

		res.send({response:output});
	} catch (err) {
		res.send({error:'internal_error'});
	}
}
// Изменение
exports.update = async (req,res) => {
	var data = req.body;

	// Проверяем правильность входных параметров
	var obj = {};
	if('name'	in data && data.name.length)	obj.name	= f.htmlspecialchars(data.name);
	if('age'	in data && data.age>0)			obj.age		= f.parse_int(data.age);

	try {
		// Предполагается, что мы еще до этого проверили подлинность user_id
		await model.update(data.user_id,obj);

		res.send({response:1});
	} catch (err) {
		res.send({error:'internal_error'});
	}
}
// Удаление
exports.delete = async (req,res) => {
	var data = req.body;

	try {
		// Предполагается, что мы еще до этого проверили подлинность user_id
		await model.delete(data.user_id);
		res.send({response:1});
	} catch (err) {
		res.send({error:'internal_error'});
	}
}
