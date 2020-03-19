// Базовый маршрут (так же называется и контроллер)
var base		= 'images';

// Контроллер
var images		= require("../controllers/"+base);


module.exports = function(app) {
	//GET LIST	
	app.get(
			'/api/v1/'+base+'/',
			// Вставляем промежуточный обработчик - логирование
			(req,res,next) => {
				console.log('Запрос списка изображений');
				console.log(req.session)
				res.set('Access-Control-Allow-Origin','*');
				res.set('Content-Type','application/json');
				next();
			},
			// Также тут следует проводить все возможные проверки - подписи запроса, прав доступа и т.п.
			
			[images.list]
		);
	//GET IMAGE
	app.get(
			'/api/v1/'+base+'/:imageId',
			// Вставляем промежуточный обработчик - логирование
			(req,res,next) => {
				console.log(req.params.imageId)				
				res.set('Access-Control-Allow-Origin','*');
				res.set('Content-Type','application/json');	
				next();			
			},
			// Также тут следует проводить все возможные проверки - подписи запроса, прав доступа и т.п.
			
			[images.get]
		);

	//DELETE IMAGE
	app.delete(
			'/api/v1/'+base+'/:imageId',
			// Вставляем промежуточный обработчик - логирование
			(req,res,next) => {
				console.log(req.params.imageId)				
				res.set('Access-Control-Allow-Origin','*');
				res.set('Content-Type','application/json');	
				next();			
			},
			// Также тут следует проводить все возможные проверки - подписи запроса, прав доступа и т.п.
			
			[images.delete]
		);
	
	//UPLOAD IMAGE
	app.post('/api/v1/'+base,
		(req,res,next) => {
				console.log("Запрос отправки изображения")				
				res.set('Access-Control-Allow-Origin','*');
				res.set('Content-Type','application/json');	
				next();			
			},
		require('../controllers/'+base).add);
}
