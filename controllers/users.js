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
	if(!('login' in data) || data.login == '') return res.send({error:'parameter login is not defined'});
	if(!('password' in data) || data.password == '') return res.send({error:'parameter password is not defined'});

	var name = f.htmlspecialchars(data.name);
	var age = +f.parse_int(data.age);
	let file;
	if (req.files) file = req.files.file;

	try {	
		(model.get_by_login(data.login).then(result=>{
			console.log(result);
			if (!result) {		
				// Нужно проверить все входные данные
				var user_id = ( model.create({
					login: data.login,
					password: data.password,
					name:	data.name,
					sex: data.sex,
					age: data.age,
					avatar: file ? file.name : ""
				})).then(result=>{
					file ? file.mv('images/avatars/'+result.insertId+file.name,(err) => {
						if(err) return res.status(500).send(err);
						res.send({response:1});
					}) : "";
				});
			} else res.status(403).send({error: 'login already taken'})
		}))	
		
		
	} catch (err) {
		res.send({error:'internal_error '+err});
	}
}
// Получение
exports.session_new = async (req,res) => {
	res.set('Access-Control-Allow-Origin','*');	
	var login = req.body.login;
	var password = req.body.password;
	
	if (login && password) {
		try {
			model.login(login, password).then(result => {
				console.log("result",result)
				if (result.length > 0) {	

					req.session.loggedin = true;
					req.session.login = login;
					req.session.user_id = result[0].id;
					
					res.send({response: {login: login, user_id: result[0].id}});
				} else {
					res.status(403).send(`Неверные логин или пароль`);
				}			
				res.end();
			});	
		} catch (err) {
			res.send({error:'internal_error'});
		}
			
	} else {
		res.status(401).send('Please enter Username and Password!');
		res.end();
	}		
}

// auth
exports.session = async (req,res) => {
	res.set('Access-Control-Allow-Origin','*');	
	
	if (req.session.loggedin && req.session.login) {	
		res.send({response: login});	
	} else {
		res.status(401).send('Please enter Username and Password!');
		res.end();
	}		
}

// delete session
exports.session_del = async (req,res) => {
	res.set('Access-Control-Allow-Origin','*');	
	console.log(req.session)
	if (req.session.loggedin && req.session.login) {
		req.session.destroy();	
		res.send({response: 1});	
	} else {
		res.status(401).send('Please enter Username and Password!');
		res.end();
	}		
}

// function(error, results, fields) {
// 			if (results.length > 0) {
// 				req.session.loggedin = true;
// 				req.session.login = login;
// 				res.redirect('/home');
// 			} else {
// 				res.send('Incorrect Username and/or Password!');
// 			}			
// 			res.end();
// 		}
// Получение
exports.get = async (req,res) => {	
	console.log(req.params)
	var id = +f.parse_int(req.params.id);

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
