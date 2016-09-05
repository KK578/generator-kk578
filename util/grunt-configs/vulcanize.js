module.exports = (options) => {
	const vulcanize = {};

	if (options.polymerApp) {
		vulcanize.options = {
			excludes: ['build/public/bower-components/polymer/polymer.html'],
			inlineScripts: true,
			inlineCss: true,
			stripComments: true
		}

		vulcanize['splash-elements'] = {
			options: {
				csp: 'scripts/splash-elements.js'
			},
			files: {
				'build/public/splash-elements.html': 'build/public/splash-elements.html'
			}
		};

		vulcanize.elements = {
			options: {
				stripExcludes: [
					// Polymer
					'build/public/bower-components/polymer/polymer.html',

					// Paper-Material
					'build/public/bower-components/paper-material/paper-material.html',
					'build/public/bower-components/paper-styles/shadow.html',
					'build/public/bower-components/paper-material/paper-material-shared-styles.html',

					// Paper-Spinner
					'build/public/bower-components/paper-spinner/paper-spinner.html',
					'build/public/bower-components/iron-flex-layout/iron-flex-layout.html',
					'build/public/bower-components/paper-spinner/paper-spinner-behavior.html',
					'build/public/bower-components/paper-spinner/paper-spinner-styles.html',

					// Paper-Styles/color
					'build/public/bower-components/paper-styles/color.html',

					// Neon-Animation-Runner-Behavior
					'build/public/bower-components/neon-animation/neon-animation-runner-behavior.html',
					'build/public/bower-components/neon-animation/neon-animatable-behavior.html',
					'build/public/bower-components/iron-meta/iron-meta.html',

					// Reverse-Ripple-Animation
					'build/public/bower-components/neon-animation/animations/reverse-ripple-animation.html',
					'build/public/bower-components/neon-animation/neon-shared-element-animation-behavior.html',
					'build/public/bower-components/neon-animation/neon-animation-behavior.html',
					'build/public/bower-components/neon-animation/web-animations.html',
					'build/public/bower-components/web-animations-js/web-animations-next-lite.min.js'
				],
				csp: 'scripts/elements.js'
			},
			files: {
				'build/public/elements.html': 'build/public/elements.html'
			}
		}
	}

	return vulcanize;
};
