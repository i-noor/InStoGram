// Здесь указываем все маршруты, по которым сервер будет выдавать информацию
module.exports = (app) => {
	// Например, выдача изображений
	app.get('/images/*',(req,res) => {
		require("fs").readFile('images/'+req.params[0],(err,data) => {
			res.set('Content-Type','image/'+req.params[0].substr(req.params[0].indexOf('.')+1));
			if(err) {
				console.log(err);
				return res.send("Изображение не доступно");
			}
			res.send(data);
		});
	});

	// Загрузка изображений: обработчик запроса указан в контроллере
	app.post('/api/image',require("../controllers/image"));

	// Если можно логически выделить несколько маршрутов на одну тему, лучше их вынести в отдельный файл
	require("./user")(app);
}
