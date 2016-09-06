/* eslint no-var: "off", prefer-template: "off" */
(function () {
	function supportsEs6() {
		try {
			// Attempt to evaluate an arrow function definition.
			// Must do from within a string to avoid a SyntaxError.
			eval('var x = (y) => (y + 1);');
		}
		catch (e) {
			return false;
		}

		return true;
	}

	var src = document.querySelector('#es6-support').src;
	var target = src.split('?target=')[1];
	var script = document.createElement('script');

	if (!supportsEs6()) {
		target = target.replace('.js', '.es5.js');
	}

	script.src = 'scripts/' + target;
	document.head.appendChild(script);
})();
