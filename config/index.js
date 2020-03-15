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
		},
		resave: false,
		saveUninitialized: true,
	},
}
