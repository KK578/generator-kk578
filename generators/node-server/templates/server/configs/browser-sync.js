module.exports = (server) => {
	if (server.get('env') === 'production') {
		return;
	}

	const browserSync = require('browser-sync');
	const bs = browserSync.create('Server');

	// Defer browser-sync initialisation until next tick to ensure the express server is running.
	process.nextTick(() => {
		const port = process.env.BROWSER_SYNC_PORT || 3000;
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
};
