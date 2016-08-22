const express = require('express');
const path = require('path');
const router = express.Router();


// Serve public directory as static html.
router.get('/', express.static(path.join(__dirname, '../../public/')));

// Serve 404 page.
router.get('*', (req, res) => {
	res.status(404).render(path.join(__dirname, '../../public/404.html'));
});


module.exports = router;
