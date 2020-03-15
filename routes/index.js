// Здесь указываем все маршруты, по которым сервер будет выдавать информацию
module.exports = (app) => {
	app.post('/api/v1/session/new', (req,res,next) => {
			console.log('Запрос login');

			res.set('Access-Control-Allow-Origin','*');
			res.set('Content-Type','application/json');
			next();
		}, require("../controllers/users").session_new
	);

	app.post('/api/v1/session', (req,res,next) => {
			console.log('Запрос auth');

			res.set('Access-Control-Allow-Origin','*');
			res.set('Content-Type','application/json');
			next();
		}, require("../controllers/users").session
	);

	app.delete('/api/v1/session', (req,res,next) => {
			console.log('Запрос auth');

			res.set('Access-Control-Allow-Origin','*');
			res.set('Content-Type','application/json');
			next();
		}, require("../controllers/users").session_del
	);

	// Если можно логически выделить несколько маршрутов на одну тему, лучше их вынести в отдельный файл
	require("./user")(app);
	require("./image")(app);
}
