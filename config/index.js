module.exports = {
	server: {
		port: 7500,
	},
    dbh: require("./dbh"),
	session: {
		secret: 'XSS',
		key: 'sid',
		cookie: {
			path: '/api',
			httpOnly: true,
			maxAge: 60*60*1000,
			secure: true,
		},
		resave: false,
		saveUninitialized: true,
	},
}
