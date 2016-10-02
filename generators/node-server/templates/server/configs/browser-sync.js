'use strict';
const fs = require('fs');
const path = require('path');

function loadPlugins(callback) {
	const dir = path.join(__dirname, 'browser-sync/plugins');

	fs.readdir(dir, (err, files) => {
		if (err) {
			return callback(err);
		}

		let readPlugins = 0;
		let scriptContents = '';

		files.map((file) => {
			fs.readFile(path.join(dir, file), 'utf-8', (err, data) => {
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

		let otherFiles = ['build/public/**/*.{html,css,js}'];
		const watchedFiles = [];

		files.map((file) => {
			const handler = require(path.join(__dirname, 'browser-sync/handlers', file));

			watchedFiles.push(handler);

			// Add the specially handled files to an ignored list.
			otherFiles = otherFiles.concat(handler.match.map((s) => {
				return `!${s}`;
			}));
		});

		// Return list of files with special handlers at top of list to ensure custom handlers are
		// run. All other files are included afterwards.
		callback(null, watchedFiles.concat(otherFiles));
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

		// TODO: Load this from a JSON file.
		// Scroll elements to be synced across apps.
		const scrollElements = [
			'#mainContainer'
		];

		bs.use({
			plugin: function () {
				return true;
			},
			hooks: {
				'client:events': function () {
					// TODO: Load this from plugins.
					const events = ['custom-component-css'];

					scrollElements.map(function (element) {
						events.push(`${element}:scroll`);
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
