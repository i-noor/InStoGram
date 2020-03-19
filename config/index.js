module.exports = {
	server: {
		port: 8080,
	},
    dbh: require("./dbh"),
	session: {
		secret: 'XSS',
		key: 'sid',
		cookie: {			
			secure: true,
			maxAge: 60*60*1000,
		},
		resave: false,
		saveUninitialized: true,
	},
}
