class ServiceBuildElement {

    buildElement(options) {
        let element = document.createElement(options.tagName);

        if ('className' in options) {
            element.className = options.className;
        }

        if ('innerText' in options) {
            element.innerText = options.innerText;
        }

        if ('backgroundImage' in options) {
            element.style.backgroundImage = `url(img/${options.backgroundImage})`;

        }

        if ('id' in options) {
            element.setAttribute("data-id", options.id)
        }

        return element;
    }
}

let serviceBuildElement = new ServiceBuildElement();
