const express = require('express');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const router = express.Router();


// Inject list of installed bower components when requesting bower script.
router.get('/scripts/bower.js', (req, res) => {
	const scriptPath = path.join(__dirname, '../../public/scripts/bower.js');

	fs.readFile(scriptPath, { encoding: 'utf-8' }, (err, js) => {
		if (err) {
			throw err;
		}

		const bowerPath = path.join(__dirname, '../../../public/bower-components/');

		// Find all bower components that contain an index.html at their root.
		glob('*/index.html', { cwd: bowerPath }, (err, files) => {
			if (err) {
				throw err;
			}

			// Elements are rendered by finding the 'component' item in the object.
			// All elements are listed as 'element-name/index.html', so slice after the '/'.
			const elements = files.map((indexPath) => {
				return { component: indexPath.split('/')[0] };
			});

			// Most unreliable section, find the empty array [], and replace with element list.
			res.send(js.replace(/\[\]/i, JSON.stringify(elements)));
		});
	});
});

router.get('/bower', (req, res) => {
	res.render(path.join(__dirname, '../../public/bower.html'));
});

// Serve bower components from source files to this route.
router.use('/bower', express.static(path.join(__dirname, '../../../public/bower-components')));


module.exports = {
	mountPath: '/',
	router: router
};
