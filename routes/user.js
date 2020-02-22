// Базовый маршрут (так же называется и контроллер)
var base		= 'user';

// Контроллер
var user		= require("../controllers/"+base);

// Разные методы одной сущности
// Предполагаем, что запросы будут приходить на адреса "/api/v1/user/add", "/api/v1/user/get" и т.д.
var listener = [
	{
		method:		'add',
		actions:	[user.add],
	},
	{
		method:		'get',
		actions:	[user.get],
	},
	{
		method:		'list',
		actions:	[user.list],
	},
	{
		method:		'update',
		actions:	[user.update],
	},
	{
		method:		'delete',
		actions:	[user.delete],
	},
];

module.exports = function(app) {
	// Создаем обработчики запросов для каждого метода сущности "пользователь"
	for(let i=0; i<listener.length; i++) {
		let row = listener[i];
		app.post(
			'/api/v1/'+base+'/'+row.method,
			// Вставляем промежуточный обработчик - логирование
			(req,res,next) => {
				console.log('Запрос',base+'/'+row.method);

				res.set('Access-Control-Allow-Origin','*');
				res.set('Content-Type','application/json');
				next();
			},
			// Также тут следует проводить все возможные проверки - подписи запроса, прав доступа и т.п.

			// И после всего перейти к контроллерам
			row.actions
		);
	}
}
