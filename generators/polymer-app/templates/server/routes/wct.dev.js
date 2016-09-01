const express = require('express');
const router = express.Router();


// HACK: Windows URLs in WCT break due to additional '\' added.
// This route removes these incorrect links and redirects to the correct location.
router.get('/', function (req, res, next) {
	const query = req.query;

	if (query && query.grep) {
		const fixedUrl = query.grep.replace(/\\/g, '');

		if (query.grep !== fixedUrl) {
			res.redirect(`/test/?grep=${fixedUrl}`);

			return;
		}
	}

	next();
});


module.exports = {
	mountPath: '/test',
	router: router
};
