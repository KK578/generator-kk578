(function () {
	const template = document.getElementById('template');

	function setupTemplate() {
		template.properties = {
			components: {
				type: Array,
				value: []
			},
			selected: {
				type: String,
				observer: 'selectedChanged'
			}
		};

		template.selectedChanged = (newElement) => {
			template.displayed = `/bower/${newElement}`;
		};

		template.select = (e) => {
			const event = Polymer.dom(e).event;
			const hash = event.model.item.component;

			window.location.hash = hash;
			template.$['drawer-panel'].closeDrawer();
		};
	}

	function onHashChange() {
		const hash = window.location.hash.split('#')[1];

		template.selected = hash;
	}

	setupTemplate();
	window.addEventListener('hashchange', onHashChange);
	onHashChange();
});
