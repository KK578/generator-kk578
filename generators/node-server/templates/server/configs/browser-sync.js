const fs = require('fs');
const path = require('path');

function loadPlugins(bs, callback) {
	fs.readdir(path.join(__dirname, 'browser-sync/plugins'), (err, files) => {
		if (err) {
			return callback(err);
		}

		files.map((file) => {
			const plugin = require(file);

			bs.use({
				plugin: plugin.plugin,
				hooks: plugin.hooks
			});
		});

		callback();
	});
}

module.exports = (server) => {
	if (server.get('env') === 'production') {
		return;
	}

	const browserSync = require('browser-sync');
	const bs = browserSync.create('Server');

	loadPlugins(bs, () => {
		// Defer browser-sync initialisation until next tick to ensure express server is running.
		process.nextTick(() => {
			const port = process.env.PORT_BROWSER_SYNC || 3000;
			const proxy = `localhost:${parseInt(server.get('port'))}`;
			const files = [
				{
					match: [
						'public/**/*.{html,css,js}'
					]
				}
			];

			bs.init({
				files: files,
				logPrefix: 'BrowserSync',
				minify: true,
				open: false,
				reloadOnRestart: true,
				reloadDebound: 2000,
				server: false,
				port: port,
				proxy: proxy
			});
		});
	});
};
