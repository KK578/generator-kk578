const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();


// Stamp css content into html during development.
router.get('/custom-components/:component/*.html', (req, res) => {
	const element = req.params.component;
	const elementPath = path.join(__dirname, `../../public/custom-components/${element}/${element}`);

	fs.readFile(`${elementPath}.html`, 'utf-8', (err, html) => {
		if (err) {
			throw err;
		}

		fs.readFile(`${elementPath}.css`, 'utf-8', (err, css) => {
			if (err) {
				throw err;
			}

			// Find the style tag that references the component's css.
			const stampLocation = new RegExp(`<template><link.*href=".*?${element}.css.*?".*?\/?>)`);
			const taggedCss = `<template><style>${css}</style>`;

			res.send(html.replace(stampLocation, taggedCss));
		});
	});
});

// Don't send the css file if it has been requested directly.
router.get('/custom-components/**/*.css', (req, res) => {
	res.send('');
});

// TODO: Add route to transpile js on request.
//router.get('/custom-components/**/*.js', (req, res) => { });


module.exports = {
	mountPath: '/',
	router: router
};
