var express = require("express");
var session     = require('express-session');
var bodyParser = require("body-parser");
var fs = require("fs");
const imagesFolder = './images/';
const multer  = require("multer");
const mysql = require("mysql2");
 
 // Настройки
var config = require("./config");

var app = express();

// Подключаем модули:
// Сессии
app.use(session(config.session));
// Обработка json
app.use(bodyParser.json());

 const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "images");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});


 // определение фильтра
const fileFilter = (req, file, cb) => {
  
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
 };

app.use(express.static(__dirname + "/public"));
app.use(multer({storage:storageConfig, fileFilter: fileFilter}).single("filedata"));
app.use(multer({dest:"uploads"}).single("filedata"));

// получение списка изображений  
app.get("/api/images", function(req, res){
      
    fs.readdir(imagesFolder, (err, files) => {
	  var content = JSON.stringify(files);
	  res.send(content);
	});   
    
});
// загрузка изображений
app.post("/upload", function (req, res, next) {
   
    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});

  require('./routes')(app);
app.listen(8080, function(){
    console.log("Сервер ожидает подключения...");
});