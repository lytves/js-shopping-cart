class ServiceProducts {
    constructor(containerProducts, productsCatalog) {
        this.container = document.querySelector(containerProducts);
        this.productsCatalog = productsCatalog;
        this.create();

    }

    create() {
        // to avoid costly DOM operation, will update DOM only one time
        let itemsWrapper = document.createElement('slot');

        for (let product of this.productsCatalog) {

            let item = this.buildElement({
                tagName: 'div',
                className: 'item '
            });
            let itemTitle = this.buildElement({
                tagName: 'div',
                className: 'item-title',
                innerText: product.name
            });
            let itemImg = this.buildElement({
                tagName: 'div',
                className: 'item-img',
                backgroundImage: product.img
            });
            let itemPrice = this.buildElement({
                tagName: 'div',
                className: 'item-price',
                innerText: product.price.toLocaleString() + " €"
            });
            let itemButton = this.buildElement({
                tagName: 'div',
                className: 'item-btn',
                innerText: 'Add to cart'
            });

            item.appendChild(itemTitle);
            item.appendChild(itemImg);
            item.appendChild(itemPrice);
            item.appendChild(itemButton);
            itemsWrapper.appendChild(item);
        }
        this.container.appendChild(itemsWrapper);
    }

    buildElement(options) {
        let element = document.createElement(options.tagName);

        if ('className' in options) {
            element.className = options.className;
        }

        if ('innerText' in options) {
            element.innerText = options.innerText;
        }

        if ('backgroundImage' in options) {
            element.style.backgroundImage =  `url(img/${options.backgroundImage})`;

        }

        return element;
    }

    actions() {

    }
}

let serviceProducts = new ServiceProducts('.container-products', productsCatalog);