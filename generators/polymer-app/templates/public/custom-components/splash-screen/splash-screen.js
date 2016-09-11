(function () {
	class SplashScreen {
		get behaviors() {
			return [Polymer.NeonAnimationRunnerBehavior];
		}

		get listeners() {
			return {
				'neon-animation-finish': 'onCloseAnimationFinished'
			};
		}

		beforeRegister() {
			this.is = 'splash-screen';

			this.properties = {
				animationConfig: {
					type: Object,
					value: function () {
						const x = window.innerWidth / 2;
						const y = 0;

						return {
							name: 'reverse-ripple-animation',
							id: 'ripple',
							gesture: { x: x, y: y },
							fromPage: this,
							toPage: this
						};
					}
				},
				sharedElements: {
					type: Object,
					value: function () {
						return { ripple: this };
					}
				}
			};
		}

		attached() {
			document.body.classList.add('splash-animating');

			const delay = 275;

			this.async(this.startSplashAnimation, delay);
			this.async(this.loadAppDependencies, delay + 300);
		}

		startSplashAnimation() {
			Polymer.dom(this.$.spinner).classList.remove('minimised');
			this.$.spinner.active = true;
			this.$.card.elevation = 5;
		}

		endSplashAnimation() {
			Polymer.dom(this.$.card).classList.remove('loading');
			this.$.card.elevation = 0;

			Polymer.dom(this.$.title).classList.remove('loading');

			Polymer.dom(this.$.spinner).classList.add('minimised');
			this.$.spinner.active = false;
		}

		loadAppDependencies() {
			Polymer.Base.importHref('elements.html', () => {
				this.endSplashAnimation();

				this.async(this.closeAnimation, 300);
			});
		}

		closeAnimation() {
			this.playAnimation();
		}

		onCloseAnimationFinished() {
			document.body.classList.remove('splash-animating');
			Polymer.dom(this.parentNode).removeChild(this);
		}
	}

	Polymer(SplashScreen);
})();
