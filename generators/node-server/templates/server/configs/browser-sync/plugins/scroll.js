// TODO: Confirm the event name.
/* eslint no-var: "off", prefer-template: "off" */
window.addEventListener('WebComponentsReady', function () {
	var elements = ['#mainContainer'];

	elements.map(function (elementName) {
		var element = document.querySelector(elementName);
		var eventName = elementName + ':scroll';

		element.addEventListener('scroll', function (e) {
			window.___browserSync___.socket.emit(eventName, e.target.scrollTop);
		});

		window.___browserSync___.socket.on(eventName, function (scrollTop) {
			element.scrollTop = scrollTop;
		});
	});
});
