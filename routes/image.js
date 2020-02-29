// Базовый маршрут (так же называется и контроллер)
var base		= 'image';

// Контроллер
var image		= require("../controllers/"+base);

// Разные методы одной сущности
// Предполагаем, что запросы будут приходить на адреса "/api/v1/image/add", "/api/v1/image/get" и т.д.
var listener = [	
	{
		method:		'get',
		actions:	[image.get],
	},
	{
		method:		'list',
		actions:	[image.list],
	},
	// {
	// 	method:		'update',
	// 	actions:	[image.update],
	// },
	{
		method:		'delete',
		actions:	[image.delete],
	},
];

module.exports = function(app) {
	
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

	app.post('/api/v1/image/add',require("../controllers/image").add);
}
