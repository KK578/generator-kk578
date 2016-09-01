(function () {
	const loadingDelay = 100;
	const finishDelay = 500;

	function endSplashScreen() {
		document.getElementById('splash-screen').runAnimation();
	}

	function loadAppDependencies() {
		Polymer.Base.importHref('elements.html', function () {
			const loaders = document.querySelectorAll('.loading');

			loaders.forEach((loader) => {
				loader.classList.remove('loading');
			});

			// HACK: Some browsers don't appear to like multiple animations running on the same
			// element at the same time. So run async to allow loading class styles to be
			// removed before seaming the card into the background.
			window.setTimeout(function () {
				// End splash-screen animation.
				document.getElementById('splash-spinner').active = false;
				document.getElementById('splash-card').elevation = 0;
			}, finishDelay);

			window.setTimeout(endSplashScreen, finishDelay);
		});
	}

	function startSplashScreen() {
		// Scale in paper-spinner and animate paper-material.
		document.getElementById('splash-spinner').classList.remove('loading');
		document.getElementById('splash-card').elevation = 5;

		window.setTimeout(loadAppDependencies, loadingDelay);
	}

	function loadInitialDependencies() {
		function loaded() {
			window.setTimeout(startSplashScreen, 0);
		}

		const elementImport = document.createElement('link');

		elementImport.rel = 'import';
		elementImport.href = 'splash_elements.html';
		elementImport.onload = loaded;

		document.head.appendChild(elementImport);
	}

	function checkNativeWebComponents() {
		const native = 'registerElement' in document &&
			'import' in document.createElement('link') &&
			'content' in document.createElement('template');

		if (native) {
			loadInitialDependencies();
		}
		else {
			const script = document.createElement('script');

			script.src = 'bower-components/webcomponentsjs/webcomponents-lite.js';
			script.onload = loadInitialDependencies;
			document.head.appendChild(script);
		}
	}

	checkNativeWebComponents();
})();
