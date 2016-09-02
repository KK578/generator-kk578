(function () {
	function setupTemplate() {
		const template = document.getElementById('template');

		template.properties = {
			components: {
				type: Array,
				value: []
			},
			selected: {
				type: String,
				observer: 'selectedChanged'
			}
		}

		template.selectedChanged = function (n) {
			template.displayed = '/bower/' + n;
		}

		template.select = function (e) {
			const event = Polymer.dom(e).event;
			const hash = event.model.item.component;
			window.location.hash = hash;

			template.$['drawer-panel'].closeDrawer();
		}
	}

	function onHashChange() {
		var hash = window.location.hash.split('#')[1];
		template.selected = hash;
	}

	setupTemplate();
	window.addEventListener('hashchange', onHashChange);
	onHashChange();
});
