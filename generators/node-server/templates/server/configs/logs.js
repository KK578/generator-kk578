const morgan = require('morgan');

module.exports = (server) => {
	switch (server.get('env')) {
		case 'development':
		default:
			server.use(morgan('dev'));
			break;

		case 'production':
			server.use(morgan('tiny'));
			break;
	}
};
