const bower = 'build/public/bower-components';

module.exports = (options) => {
	const vulcanize = {};

	if (options.polymerApp) {
		vulcanize.options = {
			excludes: [`${bower}/polymer/polymer.html`],
			inlineScripts: true,
			inlineCss: true,
			stripComments: true
		};

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
					`${bower}/polymer/polymer.html`,

					// Paper-Styles
					`${bower}/paper-styles/color.html`,
					`${bower}/paper-styles/shadow.html`,
					`${bower}/font-roboto/roboto.html`,

					// Paper-Material
					`${bower}/paper-material/paper-material.html`,
					`${bower}/paper-material/paper-material-shared-styles.html`,

					// Paper-Spinner
					`${bower}/paper-spinner/paper-spinner.html`,
					`${bower}/paper-spinner/paper-spinner-behavior.html`,
					`${bower}/paper-spinner/paper-spinner-styles.html`,
					`${bower}/iron-flex-layout/iron-flex-layout.html`,

					// Neon-Animation-Runner-Behavior
					`${bower}/neon-animation/neon-animation-runner-behavior.html`,
					`${bower}/neon-animation/neon-animatable-behavior.html`,
					`${bower}/iron-meta/iron-meta.html`,

					// Reverse-Ripple-Animation
					`${bower}/neon-animation/animations/reverse-ripple-animation.html`,
					`${bower}/neon-animation/neon-shared-element-animation-behavior.html`,
					`${bower}/neon-animation/neon-animation-behavior.html`,
					`${bower}/neon-animation/web-animations.html`,
					`${bower}/web-animations-js/web-animations-next-lite.min.js`
				],
				csp: 'scripts/elements.js'
			},
			files: {
				'build/public/elements.html': 'build/public/elements.html'
			}
		};
	}

	return vulcanize;
};
