const express = require('express');
const router = express.Router();


router.get('/**/stylesheets/404.css\*', (req, res) => {
	res.redirect('/stylesheets/404.css');
});


module.exports = {
	mountPath: '/',
	router: router
};
