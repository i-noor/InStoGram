var express = require("express");
var session     = require('express-session');
var bodyParser = require("body-parser");
var fs = require("fs");
const imagesFolder = './images/';
var fileUpload  = require('express-fileupload');
const multer  = require("multer");
const mysql = require("mysql2");
var cookieParser = require('cookie-parser');
redisStorage = require('connect-redis')(session),
redis = require('redis'),
client = redis.createClient()
 
 // Настройки
var config = require("./config");

var app = express();
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration
// Подключаем модули:
app.use(cookieParser());
// Сессии
app.use(session(config.session));

// Обработка json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Прием файлов
app.use(fileUpload());


app.use("/",express.static(__dirname + "/client"));
app.use("/images",express.static(__dirname + "/images"));


  require('./routes')(app);
app.listen(config.server.port, function(){
    console.log("Сервер ожидает подключения...");
});