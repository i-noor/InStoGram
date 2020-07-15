module.exports = {
	server: {
		port: 8080,
	},
    dbh: require("./dbh"),
	session: {
    store: new redisStorage({
      host: '127.0.0.1',
      port: 6379,
      client: client, 
      ttl: 86400
    }),
    secret: 'ThisIsHowYouUseRedisSessionStorage',
  	name: '_redisPractice',
    resave: false,
    saveUninitialized: true
  },
}
