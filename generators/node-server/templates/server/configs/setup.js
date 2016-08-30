const ejs = require('ejs');
const compression = require('compression');
const path = require('path');

module.exports = (server) => {
	// Set render engine to static html.
	server.set('views', path.join(__dirname, '../../public/'));
	server.engine('html', ejs.renderFile);
	server.set('view engine', 'html');

	// Setup Gzip.
	server.use(compression());
};
