(function () {
	class SplashScreen {
		get behaviors() {
			return [Polymer.NeonAnimationRunnerBehavior];
		}

		get listeners() {
			return {
				'neon-animation-finish': 'onAnimationFinished'
			};
		}

		beforeRegister() {
			this.is = 'splash-screen';

			this.properties = {
				animationConfig: {
					type: Object,
					value: function () {
						const x = window.innerWidth / 2;
						const y = window.innerHeight / 2;

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
					value: () => {
						return { ripple: this };
					}
				}
			};
		}

		runAnimation() {
			document.body.classList.add('splash-animating');
			this.playAnimation();
		}

		onAnimationFinished() {
			document.body.classList.remove('splash-animating');
			Polymer.dom(this.parentNode).removeChild(this);
		}
	}

	Polymer(SplashScreen);
})();
