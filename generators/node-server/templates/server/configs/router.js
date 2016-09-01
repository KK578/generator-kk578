const fs = require('fs');
const path = require('path');

function loadRoutes(server, files) {
	files.map((file) => {
		const route = require(path.join(__dirname, '../routes/', file));
		console.log(file + '\n//' + route);

		server.use(route.mountPath, route.router);
	});
}

module.exports = (server) => {
	fs.readdir(path.join(__dirname, '../routes/'), (err, files) => {
		const developmentFiles = files.filter((file) => {
			return file.endsWith('.dev.js');
		});

		const productionFiles = files.filter((file) => {
			return !file.endsWith('.dev.js');
		});

		switch (server.get('env')) {
			case 'development':
				loadRoutes(server, developmentFiles);
				// falls through

			case 'production':
			default:
				loadRoutes(server, productionFiles);
				break;
		}
	});
};
