// Полезные функции
var f = require("../functions");

// Модель для работы с бд
var model = require("../models/images");

var author_id = 1;
// Добавление
exports.add = (req,res) => {
	// Поскольку в app.js мы подключили app.use(fileUpload()), у req доступно свойство req.files
	// В нем содержатся все файлы, переданные в форме запроса
	// В данном случае мы принимаем файл с именем "file"
	console.log(req.files)
	if(!req.files || !req.files.file) return res.send({error:'file was not sent'});

	let file = req.files.file;
	console.log(file)
	// Проверяем тип файла
	if(!/image\/(jpe?g|png)/.test(file.mimetype)) {
		return res.send("Файл должен быть формата jpeg или png!");
	}

	try {
		// Нужно проверить все входные данные
		var image_id = ( model.create({
			name:	file.name,
			mimetype:	file.mimetype,
			author_id: author_id
		}));
		
	} catch (err) {
		res.send({error:'internal_error'});
	}

	// Сохраняем файл по указанному адресу
	file.mv('images/'+image_id,(err) => {
		if(err) return res.status(500).send(err);
		res.send({response:'/images/'+image_id});
	});
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


/*
	Это довольно простой пример.
	В серьезном приложении необходимо создать таблицу в базе данных, где хранить всю информацию о файлах.
	И файл надо сохранять под именем, соответствующим id записи в таблице.
	Для этого потребуется создать модель, в которой будет описано взаимодействие как с таблицей, так и с файлом.
	А здесь в контроллере оставить только обработку ввода.
*/
