// Полезные функции
var f = require("../functions");
var path = require('path');
// Модель для работы с бд
var model = require("../models/image");
var modelUser = require("../models/user");
var fs = require('fs');

// Добавление
exports.add = (req,res) => {
	// Поскольку в app.js мы подключили app.use(fileUpload()), у req доступно свойство req.files
	// В нем содержатся все файлы, переданные в форме запроса
	// В данном случае мы принимаем файл с именем "file"
	console.log(req.files)
	if(!req.files || !req.files.file) return res.send({error:'file was not sent'});
	if(!req.session.user_id) return res.status(403).send({error:'Unauthorized'});

	let file = req.files.file;	
	let ext = path.extname(file.name);
	console.log(ext)
	// Проверяем тип файла
	if(!/image\/(jpe?g|png)/.test(file.mimetype)) {
		return res.send("Файл должен быть формата jpeg или png!");
	}

	try {
		if (req.body.type == "avatar"){
			var obj = {};
			obj.avatar = req.session.user_id+ext;
			var image_id = ( modelUser.update(req.session.user_id, obj)).then(result=>{
				
				// Сохраняем файл по указанному адресу
				file.mv('images/avatars/'+req.session.user_id+ext,(err) => {
					if(err) return res.status(500).send(err);
					res.send({response:1});
				});
			});	
		} else {			
			var image_id = ( model.create({
				name:	file.name,
				mimetype:	file.mimetype,
				author_id: req.session.user_id
			})).then(result=>{
				
				// Сохраняем файл по указанному адресу
				file.mv('images/'+result.insertId+ext,(err) => {
					if(err) return res.status(500).send(err);
					res.send({response:{
								id:result.insertId,
								name:	file.name,
								mimetype:	file.mimetype,
								author_id: req.session.user_id
							}});
				});
			});	
		}
			
	} catch (err) {
		res.send({error:'internal_error'});
	}	
}

// Получение
exports.get = async (req,res) => {	
	console.log(req.params)
	var id = +f.parse_int(req.params.imageId);

	try {
		var output = await model.gti(id);

		res.send({response:output});
	} catch (err) {
		res.send({error:'internal_error'});
	}
}
// Получение списка
exports.list = async (req,res) => {
	var data = req.query;

	// Проверяем входные параметры
	var author_id		= +f.parse_int(data.author_id);
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
			model.list(author_id,offset,limit,options,start,dir,rev,1).then(data => output.count = data),
			model.list(author_id,offset,limit,options,start,dir,rev)  .then(data => output.items = (data ? data : [])),
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
		// Предполагается, что мы еще до этого проверили подлинность image_id
		await model.update(data.image_id,obj);

		res.send({response:1});
	} catch (err) {
		res.send({error:'internal_error'});
	}
}
// Удаление
exports.delete = async (req,res) => {
	var image_id = req.params.imageId;

	try {
		var output = await model.gti(image_id).then(result=>{
			
			if (result.author_id != req.session.user_id) return res.status(403).send({error:'Unauthorized'});
			var ext = path.extname(result.name);

			var filePath = 'images/'+image_id+ext; 
			console.log(filePath)
			model.delete(image_id);
			fs.access(filePath, (err) => {
			    if (err) {
			        console.log("The file does not exist.");
			    } else {
			       fs.unlink(filePath, function(){console.log('Deleted image')});
			    }
			});			
		});
		
		
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
