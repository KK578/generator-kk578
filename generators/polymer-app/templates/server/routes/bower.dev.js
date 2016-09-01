const express = require('express');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const router = express.Router();


// Serve bower.html loading in list of installed bower components.
router.get('/', (req, res) => {
	const bowerPath = path.join(__dirname, '../../public/bower.html');

	fs.readFile(bowerPath, { encoding: 'utf-8' }, function (err, html) {
		if (err) {
			throw err;
		}

		// Find all bower_components that contain an index.html at their root.
		glob('*/index.html', { cwd: 'public/bower-components/' }, function (err, files) {
			if (err) {
				throw err;
			}

			// Elements are rendered by finding the 'component' item in the object.
			// All elements are listed as 'element-name/index.html', so slice after the '/'.
			const elements = files.map(function (indexPath) {
				return { component: indexPath.split('/')[0] };
			});

			// Most unreliable section, find the empty array [], and replace with element list.
			res.send(html.replace(/\[\]/i, JSON.stringify(elements)));
		});
	});
});

// Serve bower components from source files to this route.
router.use('/', express.static(path.join(__dirname, '../../../public/bower-components')));


module.exports = {
	mountPath: '/bower',
	router: router
};
