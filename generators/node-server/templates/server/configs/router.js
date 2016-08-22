module.exports = (server) => {
	switch (server.get('env')) {
		case 'development':
			server.use('/', require('../routes/dev-404.js'));
			// falls through

		case 'production':
		default:
			server.use('/', require('../routes/static.js'));
			break;
	}
};
