// Базовый маршрут (так же называется и контроллер)
var base		= 'users';

// Контроллер
var users		= require("../controllers/"+base);

module.exports = function(app) {
	//add user	
	app.post(
			'/api/v1/'+base+'/',
			// Вставляем промежуточный обработчик - логирование
			(req,res,next) => {
				console.log('Добавление пользователя');
				res.set('Access-Control-Allow-Origin','*');
				res.set('Content-Type','application/json');
				next();
			},
			// Также тут следует проводить все возможные проверки - подписи запроса, прав доступа и т.п.
			
			[users.add]
		);
	//GET LIST	
	app.get(
			'/api/v1/'+base+'/',
			// Вставляем промежуточный обработчик - логирование
			(req,res,next) => {
				console.log('Запрос списка пользователей');
				res.set('Access-Control-Allow-Origin','*');
				res.set('Content-Type','application/json');
				next();
			},
			// Также тут следует проводить все возможные проверки - подписи запроса, прав доступа и т.п.
			
			[users.list]
		);
	//GET USER
	app.post(
			'/api/v1/'+base+'/:id',
			// Вставляем промежуточный обработчик - логирование
			(req,res,next) => {
				console.log(req.params.id)				
				res.set('Access-Control-Allow-Origin','*');
				res.set('Content-Type','application/json');	
				next();			
			},
			// Также тут следует проводить все возможные проверки - подписи запроса, прав доступа и т.п.
			
			[users.get]
		);

	//DELETE USER
	app.delete(
			'/api/v1/'+base+'/:id',
			// Вставляем промежуточный обработчик - логирование
			(req,res,next) => {
				console.log(req.params.id)				
				res.set('Access-Control-Allow-Origin','*');
				res.set('Content-Type','application/json');	
				next();			
			},
			// Также тут следует проводить все возможные проверки - подписи запроса, прав доступа и т.п.
			
			[users.delete]
		);
}
