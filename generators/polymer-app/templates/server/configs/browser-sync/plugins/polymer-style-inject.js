/* eslint no-var: "off", prefer-template: "off" */
window.addEventListener('load', function () {
    var handle;

    function reloadComponentStyle(data) {
        var element = data.element;

        // As a Polymer app, Polymer should be locally available,
        // so use Polymer's style scoper to transform the inbound CSS to the element's scope.
        var style = Polymer.StyleTransformer.css(data.style, element);
        // Find the style tag describing the element's style.
        var styleTag = document.querySelector('style[scope="' + element + '"');

        if (styleTag) {
            // Update style if applicable.
            styleTag.innerHTML = style;
            console.log(element + ' style updated.');
        }
    }

    function attachListener() {
        if (window.___browserSync___) {
            // On finding browserSync, attach the listener and cleanup the interval.
            window.___browserSync___.socket.on('custom-component-css', reloadComponentStyle);
            console.log('Component Style update ready.');
            clearInterval(handle);
        }
    }

    // After the document has loaded, check for browserSync every 10 seconds.
    handle = window.setInterval(attachListener, 10000);
    attachListener();
});
