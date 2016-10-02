const browserSync = require('browser-sync');
const fs = require('fs');

function handleCustomElementCss(event, file) {
	const bs = browserSync.get('Server');

	// Split file path by '/' and '\'.
	// The element is designated by the 2nd to last directory.
	const directories = file.split(/[\\\/]/);
	const element = directories[directories.length - 2];

	fs.readFile(file, { encoding: 'utf-8' }, function (err, css) {
		if (err) {
			throw err;
		}

		const detail = {
			element: element,
			style: css
		};

		// Fire event on socket for client side listener.
		bs.sockets.emit('custom-component-css', detail);
	});
}

const watch = {
	match: ['build/public/custom-components/**/*.css'],
	fn: handleCustomElementCss
};

module.exports = watch;
