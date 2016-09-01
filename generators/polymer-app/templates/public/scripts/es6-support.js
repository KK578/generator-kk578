/* eslint no-var: "off" */
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

	var script = document.createElement('script');

	if (supportsEs6()) {
		script.src = 'scripts/load.js';
	}
	else {
		script.src = 'scripts/load.es5.js';
	}

	document.head.appendChild(script);
})();
