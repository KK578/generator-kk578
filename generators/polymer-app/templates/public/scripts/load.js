(function () {
	function finishPreload() {
		document.querySelector('splash-screen').classList.remove('start-up');
	}

	function loadSplashElements() {
		const elementImport = document.createElement('link');

		elementImport.rel = 'import';
		elementImport.href = 'splash-elements.html';
		elementImport.onload = finishPreload;

		document.head.appendChild(elementImport);
	}

	function checkNativeWebComponents() {
		const native = 'registerElement' in document &&
			'import' in document.createElement('link') &&
			'content' in document.createElement('template');

		if (native) {
			loadSplashElements();
		}
		else {
			const script = document.createElement('script');

			script.src = 'bower-components/webcomponentsjs/webcomponents-lite.js';
			script.onload = loadSplashElements;
			document.head.appendChild(script);
		}
	}

	checkNativeWebComponents();
})();
