const fs = require('fs');
const path = require('path');

function loadPlugins(callback) {
	fs.readdir(path.join(__dirname, 'browser-sync/plugins'), (err, files) => {
		if (err) {
			return callback(err);
		}

		let readPlugins = 0;
		let scriptContents = '';

		files.map((file) => {
			fs.readFile(path.join(__dirname, 'browser-sync/plugins', file), 'utf-8', (err, data) => {
				if (err) {
					return callback(err);
				}

				scriptContents += data;

				if (++readPlugins === files.length) {
					callback(null, scriptContents);
				}
			});
		});
	});
}

function loadHandlers(callback) {
	fs.readdir(path.join(__dirname, 'browser-sync/handlers'), (err, files) => {
		if (err) {
			return callback(err);
		}

		// TODO: Confirm path, watch either source or build files.
		let otherFiles = ['public/**/*.{html,css,js}'];
		const watchedFiles = [];

		files.map((file) => {
			const handler = require(path.join(__dirname, 'browser-sync/handlers', file));

			watchedFiles.push(handler);
			otherFiles = otherFiles.concat(handler.match.map((s) => {
				return `!${s}`;
			}));
		});

		watchedFiles.push(otherFiles);

		callback(null, watchedFiles);
	});
}

module.exports = (server) => {
	if (server.get('env') === 'production') {
		return;
	}

	const browserSync = require('browser-sync');
	const bs = browserSync.create('Server');

	loadPlugins((err, scriptContents) => {
		if (err) {
			console.log(err);

			return;
		}

		// Scroll elements to be synced across apps.
		const scrollElements = [
			'#mainContainer'
		];

		bs.use({
			plugin: function (opts, $bs) { },
			hooks: {
				'client:events': function () {
					var events = ['custom-component-css'];
					scrollElements.map(function (element) {
						events.push(element + ':scroll');
					});

					return events;
				},
				'client:js': scriptContents
			}
		});

		loadHandlers((err, files) => {
			if (err) {
				console.log(err);

				return;
			}

			// Defer initialisation until next tick to ensure express server is running.
			process.nextTick(() => {
				const port = process.env.PORT_BROWSER_SYNC || 3000;
				const proxy = `localhost:${parseInt(server.get('port'))}`;

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
	});
};
